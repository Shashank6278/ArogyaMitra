import React, { useContext, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, LineElement, PointElement } from 'chart.js'
import { Pie, Bar, Doughnut } from 'react-chartjs-2'
import html2canvas from 'html2canvas'
import { Users, UserCheck, TrendingUp, MapPin } from 'lucide-react'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, LineElement, PointElement)

const AshaDistrictReportPDF = () => {
  const { district } = useParams()
  const { backendUrl, ashaToken } = useContext(AppContext)
  const [records, setRecords] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const chartsRef = useRef(null)

  useEffect(() => {
    fetchDistrictData()
  }, [district, ashaToken, backendUrl])

  const fetchDistrictData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/health/all-records', { 
        headers: { token: ashaToken } 
      })
      if (data.success) {
        const districtRecords = data.records.filter(r => r.district === district)
        setRecords(districtRecords)
        calculateStats(districtRecords)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Error fetching district data:', error)
      toast.error('Failed to fetch district data')
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (records) => {
    const totalUsers = records.length
    const maleCount = records.filter(r => r.gender === 'Male').length
    const femaleCount = records.filter(r => r.gender === 'Female').length
    
    const bloodGroups = {}
    records.forEach(r => {
      if (r.bloodGroup) {
        bloodGroups[r.bloodGroup] = (bloodGroups[r.bloodGroup] || 0) + 1
      }
    })

    let vaccinatedCount = 0
    let totalVaccinations = 0
    records.forEach(r => {
      if (r.vaccinations && r.vaccinations.length > 0) {
        vaccinatedCount++
        totalVaccinations += r.vaccinations.length
      }
    })

    const conditions = {}
    records.forEach(r => {
      if (r.medicalConditions && r.medicalConditions !== 'None reported') {
        const conds = r.medicalConditions.split(',').map(c => c.trim())
        conds.forEach(cond => {
          conditions[cond] = (conditions[cond] || 0) + 1
        })
      }
    })

    // Calculate average height and weight
    const heights = records.filter(r => r.height).map(r => r.height)
    const weights = records.filter(r => r.weight).map(r => r.weight)
    const avgHeight = heights.length > 0 ? (heights.reduce((a, b) => a + b, 0) / heights.length).toFixed(1) : 0
    const avgWeight = weights.length > 0 ? (weights.reduce((a, b) => a + b, 0) / weights.length).toFixed(1) : 0

    setStats({
      totalUsers,
      maleCount,
      femaleCount,
      bloodGroups,
      vaccinatedCount,
      totalVaccinations,
      conditions,
      avgHeight,
      avgWeight,
      villages: [...new Set(records.map(r => r.village).filter(Boolean))].length
    })
  }

  const exportToPDF = async () => {
    setExporting(true)
    try {
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      let yPos = 20

      // Header
      pdf.setFillColor(59, 130, 246)
      pdf.rect(0, 0, pageWidth, 50, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(28)
      pdf.setFont('helvetica', 'bold')
      pdf.text('District Health Report', pageWidth / 2, 25, { align: 'center' })
      pdf.setFontSize(18)
      pdf.text(`${district} District`, pageWidth / 2, 38, { align: 'center' })
      
      yPos = 60
      pdf.setTextColor(0, 0, 0)

      // Summary Statistics
      pdf.setFontSize(18)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Summary Statistics', 14, yPos)
      yPos += 10

      pdf.autoTable({
        startY: yPos,
        head: [['Metric', 'Value']],
        body: [
          ['Total Users', stats.totalUsers],
          ['Male', stats.maleCount],
          ['Female', stats.femaleCount],
          ['Vaccinated Users', stats.vaccinatedCount],
          ['Villages Covered', stats.villages]
        ],
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] }
      })

      yPos = pdf.lastAutoTable.finalY + 15

      // Capture all charts
      if (chartsRef.current) {
        const canvas = await html2canvas(chartsRef.current, { scale: 2, backgroundColor: '#ffffff' })
        const imgData = canvas.toDataURL('image/png')
        const imgWidth = pageWidth - 28
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        
        if (yPos + imgHeight > pageHeight - 20) {
          pdf.addPage()
          yPos = 20
        }
        
        pdf.addImage(imgData, 'PNG', 14, yPos, imgWidth, imgHeight)
        yPos += imgHeight + 15
      }

      // Blood Group Distribution
      pdf.addPage()
      yPos = 20
      pdf.setFontSize(18)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Blood Group Distribution', 14, yPos)
      yPos += 10

      pdf.autoTable({
        startY: yPos,
        head: [['Blood Group', 'Count', 'Percentage']],
        body: Object.entries(stats.bloodGroups).map(([group, count]) => [
          group,
          count,
          `${((count/stats.totalUsers)*100).toFixed(1)}%`
        ]),
        theme: 'striped',
        headStyles: { fillColor: [220, 38, 38] }
      })

      // Common Medical Conditions
      if (Object.keys(stats.conditions).length > 0) {
        yPos = pdf.lastAutoTable.finalY + 15
        
        if (yPos > pageHeight - 60) {
          pdf.addPage()
          yPos = 20
        }

        pdf.setFontSize(18)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Common Medical Conditions', 14, yPos)
        yPos += 10

        pdf.autoTable({
          startY: yPos,
          head: [['Condition', 'Cases', 'Percentage']],
          body: Object.entries(stats.conditions)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([condition, count]) => [
              condition,
              count,
              `${((count/stats.totalUsers)*100).toFixed(1)}%`
            ]),
          theme: 'grid',
          headStyles: { fillColor: [168, 85, 247] }
        })
      }

      // Village-wise Distribution
      pdf.addPage()
      yPos = 20
      pdf.setFontSize(18)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Village-wise Distribution', 14, yPos)
      yPos += 10

      const villageData = [...new Set(records.map(r => r.village))].map(village => {
        const villageRecords = records.filter(r => r.village === village)
        const vaccinated = villageRecords.filter(r => r.vaccinations && r.vaccinations.length > 0).length
        return [
          village || 'Not specified',
          villageRecords.length,
          vaccinated,
          `${((vaccinated/villageRecords.length)*100).toFixed(1)}%`
        ]
      })

      pdf.autoTable({
        startY: yPos,
        head: [['Village', 'Total Users', 'Vaccinated', 'Coverage']],
        body: villageData,
        theme: 'grid',
        headStyles: { fillColor: [34, 197, 94] }
      })

      // Recommendations
      pdf.addPage()
      yPos = 20
      pdf.setFillColor(251, 191, 36)
      pdf.rect(14, yPos, pageWidth - 28, 80, 'F')
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(18)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Recommendations', 20, yPos + 15)
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'normal')
      
      const recommendations = [
        '• Focus on vaccination drives in villages with low coverage',
        '• Conduct awareness programs for common medical conditions',
        '• Regular health checkup camps in underserved areas',
        '• Maintain updated health records for all users',
        '• Strengthen ASHA worker network in high-density areas'
      ]
      
      recommendations.forEach((rec, i) => {
        pdf.text(rec, 20, yPos + 30 + (i * 10))
      })

      // Footer
      const pageCount = pdf.internal.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i)
        pdf.setFontSize(10)
        pdf.setTextColor(128, 128, 128)
        pdf.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' })
        pdf.text(`Generated on ${new Date().toLocaleDateString('en-IN')}`, 14, pageHeight - 10)
      }

      pdf.save(`District_Report_${district}_${Date.now()}.pdf`)
      toast.success('PDF downloaded successfully!')
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast.error('Failed to generate PDF')
    } finally {
      setExporting(false)
    }
  }

  if (loading) {
    return <div className='min-h-screen flex items-center justify-center'>Loading district report...</div>
  }

  if (!stats) {
    return <div className='min-h-screen flex items-center justify-center'>No data available</div>
  }

  // Chart data
  const bloodGroupChartData = {
    labels: Object.keys(stats.bloodGroups),
    datasets: [{
      label: 'Blood Group Distribution',
      data: Object.values(stats.bloodGroups),
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(251, 191, 36, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(20, 184, 166, 0.8)',
        'rgba(249, 115, 22, 0.8)'
      ],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  }

  const vaccinationChartData = {
    labels: ['Vaccinated', 'Not Vaccinated'],
    datasets: [{
      data: [stats.vaccinatedCount, stats.totalUsers - stats.vaccinatedCount],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  }

  const genderChartData = {
    labels: ['Male', 'Female'],
    datasets: [{
      label: 'Gender Distribution',
      data: [stats.maleCount, stats.femaleCount],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)'
      ],
      borderWidth: 1
    }]
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='bg-white rounded-2xl shadow-lg p-8 mb-8'>
          <div className='flex justify-between items-start'>
            <div>
              <h1 className='text-4xl font-bold text-gray-800 mb-2'>District Health Report</h1>
              <p className='text-2xl text-primary font-semibold'>{district} District</p>
              <p className='text-gray-600 mt-2'>ArogyaMitra - Rural Healthcare System</p>
            </div>
            <button 
              onClick={exportToPDF}
              disabled={exporting}
              className='bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2 font-semibold'
            >
              {exporting ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                  </svg>
                  Download PDF Report
                </>
              )}
            </button>
          </div>
          <div className='mt-4 text-sm text-gray-600'>
            <p>Generated on: {new Date().toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          {[
            { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'from-blue-500 to-indigo-600' },
            { title: 'Male', value: stats.maleCount, icon: Users, color: 'from-green-500 to-emerald-600' },
            { title: 'Female', value: stats.femaleCount, icon: Users, color: 'from-pink-500 to-rose-600' },
            { title: 'Vaccinated', value: stats.vaccinatedCount, icon: UserCheck, color: 'from-purple-500 to-violet-600' }
          ].map((card, index) => {
            const Icon = card.icon
            return (
              <div key={index} className='bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300'>
                <div className={`bg-gradient-to-br ${card.color} p-6`}>
                  <Icon className='w-10 h-10 text-white mb-4' strokeWidth={2} />
                  <h3 className='text-white text-opacity-90 text-sm font-medium mb-2'>{card.title}</h3>
                  <p className='text-4xl font-bold text-white'>{card.value}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts Section */}
        <div ref={chartsRef} className='space-y-8 mb-8'>
          {/* Blood Group & Vaccination Charts */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <div className='bg-white rounded-2xl shadow-lg p-8'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>Blood Group Distribution</h2>
              <div className='max-w-sm mx-auto'>
                <Pie 
                  data={bloodGroupChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          padding: 15,
                          font: {
                            size: 12
                          }
                        }
                      },
                      title: {
                        display: true,
                        text: `Total Users: ${stats.totalUsers}`,
                        font: {
                          size: 14
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className='bg-white rounded-2xl shadow-lg p-8'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>Vaccination Status</h2>
              <div className='max-w-sm mx-auto'>
                <Doughnut 
                  data={vaccinationChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          padding: 15,
                          font: {
                            size: 12
                          }
                        }
                      },
                      title: {
                        display: true,
                        text: `Coverage: ${((stats.vaccinatedCount/stats.totalUsers)*100).toFixed(1)}%`,
                        font: {
                          size: 14,
                          weight: 'bold'
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Gender Distribution Chart */}
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>Gender Distribution</h2>
            <div className='max-w-2xl mx-auto'>
              <Bar 
                data={genderChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false
                    },
                    title: {
                      display: true,
                      text: 'Male vs Female Users',
                      font: {
                        size: 16,
                        weight: 'bold'
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Number of Users'
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Village-wise Distribution Table */}
        <div className='bg-white rounded-2xl shadow-lg p-8 mb-8'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>Village-wise Distribution</h2>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-primary text-white'>
                  <th className='p-3 text-left'>Village</th>
                  <th className='p-3 text-center'>Total Users</th>
                  <th className='p-3 text-center'>Vaccinated</th>
                  <th className='p-3 text-center'>Coverage %</th>
                </tr>
              </thead>
              <tbody>
                {[...new Set(records.map(r => r.village))].map((village, i) => {
                  const villageRecords = records.filter(r => r.village === village)
                  const vaccinated = villageRecords.filter(r => r.vaccinations && r.vaccinations.length > 0).length
                  const coverage = ((vaccinated/villageRecords.length)*100).toFixed(1)
                  return (
                    <tr key={i} className='border-b hover:bg-gray-50'>
                      <td className='p-3 font-medium'>{village || 'Not specified'}</td>
                      <td className='p-3 text-center'>{villageRecords.length}</td>
                      <td className='p-3 text-center'>{vaccinated}</td>
                      <td className='p-3 text-center'>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          coverage >= 80 ? 'bg-green-100 text-green-800' :
                          coverage >= 50 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {coverage}%
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendations */}
        <div className='bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-8 text-white'>
          <h2 className='text-2xl font-bold mb-4'>Recommendations</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h3 className='font-semibold mb-2'>✓ Vaccination Drives</h3>
              <p className='text-sm text-white text-opacity-90'>
                Focus on villages with coverage below 80%
              </p>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>✓ Health Awareness</h3>
              <p className='text-sm text-white text-opacity-90'>
                Conduct programs for common medical conditions
              </p>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>✓ Regular Checkups</h3>
              <p className='text-sm text-white text-opacity-90'>
                Organize health camps in underserved areas
              </p>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>✓ Record Maintenance</h3>
              <p className='text-sm text-white text-opacity-90'>
                Ensure all users have updated health records
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AshaDistrictReportPDF
