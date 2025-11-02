import React, { useContext, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'
import html2canvas from 'html2canvas'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const AshaIndividualReport = () => {
  const { userId } = useParams()
  const { backendUrl, ashaToken } = useContext(AppContext)
  const [record, setRecord] = useState(null)
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const chartRef = useRef(null)

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        console.log('Fetching record for userId:', userId)
        console.log('Backend URL:', backendUrl)
        console.log('ASHA Token:', ashaToken ? 'Present' : 'Missing')
        
        const { data } = await axios.get(backendUrl + `/api/health/record/${userId}`, { 
          headers: { token: ashaToken } 
        })
        
        console.log('API Response:', data)
        
        if (data.success) {
          setRecord(data.record)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        console.error('Error fetching record:', error)
        toast.error('Failed to fetch record: ' + (error.response?.data?.message || error.message))
      } finally {
        setLoading(false)
      }
    }

    if (ashaToken && userId) {
      fetchRecord()
    } else {
      console.log('Missing requirements - Token:', !!ashaToken, 'UserId:', !!userId)
      setLoading(false)
    }
  }, [userId, ashaToken, backendUrl])

  const printReport = () => {
    window.print()
  }

  const exportToPDF = async () => {
    setExporting(true)
    try {
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      let yPos = 20

      // Header
      pdf.setFillColor(95, 111, 255)
      pdf.rect(0, 0, pageWidth, 40, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(24)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Individual Health Report', pageWidth / 2, 20, { align: 'center' })
      pdf.setFontSize(12)
      pdf.text('ArogyaMitra - Rural Healthcare System', pageWidth / 2, 30, { align: 'center' })
      
      yPos = 50
      pdf.setTextColor(0, 0, 0)

      // Patient Information
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Patient Information', 14, yPos)
      yPos += 10

      pdf.autoTable({
        startY: yPos,
        head: [['Field', 'Value']],
        body: [
          ['Name', record.userName],
          ['UHID', record.uhid || 'N/A'],
          ['Email', record.userEmail],
          ['Blood Group', record.bloodGroup || 'Not specified'],
          ['Village', record.village || 'Not specified'],
          ['District', record.district || 'Not specified']
        ],
        theme: 'grid',
        headStyles: { fillColor: [95, 111, 255] }
      })

      yPos = pdf.lastAutoTable.finalY + 15

      // Vital Statistics
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Vital Statistics', 14, yPos)
      yPos += 10

      const bmi = record.height && record.weight 
        ? (record.weight / ((record.height/100) ** 2)).toFixed(1)
        : 'N/A'

      pdf.autoTable({
        startY: yPos,
        head: [['Metric', 'Value']],
        body: [
          ['Height', `${record.height || '-'} cm`],
          ['Weight', `${record.weight || '-'} kg`],
          ['BMI', `${bmi} kg/m²`]
        ],
        theme: 'grid',
        headStyles: { fillColor: [34, 197, 94] }
      })

      yPos = pdf.lastAutoTable.finalY + 15

      // Capture charts if they exist
      if (chartRef.current) {
        const canvas = await html2canvas(chartRef.current, { scale: 2 })
        const imgData = canvas.toDataURL('image/png')
        const imgWidth = pageWidth - 28
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        
        if (yPos + imgHeight > pageHeight - 20) {
          pdf.addPage()
          yPos = 20
        }
        
        pdf.addImage(imgData, 'PNG', 14, yPos, imgWidth, imgHeight)
        yPos += imgHeight + 10
      }

      // Medical Information
      if (yPos > pageHeight - 60) {
        pdf.addPage()
        yPos = 20
      }

      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Medical Information', 14, yPos)
      yPos += 10

      pdf.autoTable({
        startY: yPos,
        head: [['Category', 'Details']],
        body: [
          ['Medical Conditions', record.medicalConditions || 'None reported'],
          ['Allergies', record.allergies || 'None reported'],
          ['Current Medications', record.currentMedications || 'None reported']
        ],
        theme: 'grid',
        headStyles: { fillColor: [168, 85, 247] },
        styles: { cellWidth: 'wrap' }
      })

      // Vaccinations
      if (record.vaccinations && record.vaccinations.length > 0) {
        pdf.addPage()
        yPos = 20
        pdf.setFontSize(16)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Vaccination Records', 14, yPos)
        yPos += 10

        pdf.autoTable({
          startY: yPos,
          head: [['Vaccine Name', 'Date Taken', 'Next Due Date', 'Status']],
          body: record.vaccinations.map(vac => [
            vac.name,
            vac.date,
            vac.nextDueDate || 'N/A',
            vac.status || 'Completed'
          ]),
          theme: 'striped',
          headStyles: { fillColor: [34, 197, 94] }
        })
      }

      // Footer
      const pageCount = pdf.internal.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i)
        pdf.setFontSize(10)
        pdf.setTextColor(128, 128, 128)
        pdf.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' })
        pdf.text(`Generated on ${new Date().toLocaleDateString('en-IN')}`, 14, pageHeight - 10)
      }

      pdf.save(`Health_Report_${record.userName}_${Date.now()}.pdf`)
      toast.success('PDF downloaded successfully!')
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast.error('Failed to generate PDF')
    } finally {
      setExporting(false)
    }
  }

  if (loading) {
    return <div className='min-h-screen flex items-center justify-center'>Loading report...</div>
  }

  if (!record) {
    return <div className='min-h-screen flex items-center justify-center'>Record not found</div>
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 print:bg-white'>
      <div className='max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 print:shadow-none'>
        {/* Header */}
        <div className='border-b-2 border-primary pb-4 mb-6'>
          <div className='flex justify-between items-start'>
            <div>
              <h1 className='text-3xl font-bold text-primary'>Individual Health Report</h1>
              <p className='text-gray-600 mt-1'>ArogyaMitra - Rural Healthcare System</p>
            </div>
            <div className='flex gap-3 print:hidden'>
              <button 
                onClick={printReport}
                className='bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors'
              >
                Print Report
              </button>
              <button 
                onClick={exportToPDF}
                disabled={exporting}
                className='bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center gap-2'
              >
                {exporting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                    </svg>
                    Download PDF
                  </>
                )}
              </button>
            </div>
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

        {/* Patient Information */}
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Patient Information</h2>
          <div className='grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-lg'>
            <div>
              <p className='text-sm text-gray-600'>Name</p>
              <p className='font-semibold text-lg'>{record.userName}</p>
            </div>
            <div>
              <p className='text-sm text-gray-600'>UHID</p>
              <p className='font-semibold text-lg font-mono'>{record.uhid || 'N/A'}</p>
            </div>
            <div>
              <p className='text-sm text-gray-600'>Email</p>
              <p className='font-semibold'>{record.userEmail}</p>
            </div>
            <div>
              <p className='text-sm text-gray-600'>Blood Group</p>
              <p className='font-semibold'>{record.bloodGroup || 'Not specified'}</p>
            </div>
            <div>
              <p className='text-sm text-gray-600'>Village</p>
              <p className='font-semibold'>{record.village || 'Not specified'}</p>
            </div>
            <div>
              <p className='text-sm text-gray-600'>District</p>
              <p className='font-semibold'>{record.district || 'Not specified'}</p>
            </div>
          </div>
        </div>

        {/* Vital Statistics */}
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Vital Statistics</h2>
          <div className='grid grid-cols-3 gap-4'>
            <div className='bg-blue-50 p-6 rounded-lg text-center'>
              <p className='text-sm text-gray-600 mb-2'>Height</p>
              <p className='text-3xl font-bold text-blue-600'>{record.height || '-'}</p>
              <p className='text-sm text-gray-500'>cm</p>
            </div>
            <div className='bg-green-50 p-6 rounded-lg text-center'>
              <p className='text-sm text-gray-600 mb-2'>Weight</p>
              <p className='text-3xl font-bold text-green-600'>{record.weight || '-'}</p>
              <p className='text-sm text-gray-500'>kg</p>
            </div>
            <div className='bg-purple-50 p-6 rounded-lg text-center'>
              <p className='text-sm text-gray-600 mb-2'>BMI</p>
              <p className='text-3xl font-bold text-purple-600'>
                {record.height && record.weight 
                  ? ((record.weight / ((record.height/100) ** 2)).toFixed(1))
                  : '-'
                }
              </p>
              <p className='text-sm text-gray-500'>kg/m²</p>
            </div>
          </div>
        </div>

        {/* Health Metrics Chart */}
        {record.height && record.weight && (
          <div className='mb-8' ref={chartRef}>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Health Metrics Visualization</h2>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <div className='max-w-md mx-auto'>
                <Bar
                  data={{
                    labels: ['Height (cm)', 'Weight (kg)', 'BMI (kg/m²)'],
                    datasets: [{
                      label: 'Health Metrics',
                      data: [
                        record.height || 0,
                        record.weight || 0,
                        record.height && record.weight ? (record.weight / ((record.height/100) ** 2)).toFixed(1) : 0
                      ],
                      backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(168, 85, 247, 0.8)'
                      ],
                      borderColor: [
                        'rgb(59, 130, 246)',
                        'rgb(34, 197, 94)',
                        'rgb(168, 85, 247)'
                      ],
                      borderWidth: 2
                    }]
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false
                      },
                      title: {
                        display: true,
                        text: 'Patient Health Metrics',
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
                          text: 'Value'
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Medical Conditions */}
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Medical Information</h2>
          <div className='space-y-4'>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='font-semibold text-gray-700 mb-2'>Medical Conditions</p>
              <p className='text-gray-600'>{record.medicalConditions || 'None reported'}</p>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='font-semibold text-gray-700 mb-2'>Allergies</p>
              <p className='text-gray-600'>{record.allergies || 'None reported'}</p>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='font-semibold text-gray-700 mb-2'>Current Medications</p>
              <p className='text-gray-600'>{record.currentMedications || 'None reported'}</p>
            </div>
          </div>
        </div>

        {/* Vaccination Records */}
        {record.vaccinations && record.vaccinations.length > 0 && (
          <div className='mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Vaccination Records</h2>
            <div className='overflow-x-auto'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='bg-primary text-white'>
                    <th className='p-3 text-left'>Vaccine Name</th>
                    <th className='p-3 text-left'>Date Taken</th>
                    <th className='p-3 text-left'>Next Due Date</th>
                    <th className='p-3 text-left'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {record.vaccinations.map((vac, i) => (
                    <tr key={i} className='border-b hover:bg-gray-50'>
                      <td className='p-3'>{vac.name}</td>
                      <td className='p-3'>{vac.date}</td>
                      <td className='p-3'>{vac.nextDueDate || 'N/A'}</td>
                      <td className='p-3'>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          vac.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {vac.status || 'Completed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Visit History */}
        {record.visits && record.visits.length > 0 && (
          <div className='mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Visit History</h2>
            <div className='space-y-4'>
              {record.visits.map((visit, i) => (
                <div key={i} className='border-l-4 border-primary bg-gray-50 p-4 rounded'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className='text-sm text-gray-600'>Date</p>
                      <p className='font-semibold'>{visit.date}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Reason for Visit</p>
                      <p className='font-semibold'>{visit.reason}</p>
                    </div>
                    <div className='col-span-2'>
                      <p className='text-sm text-gray-600'>Diagnosis</p>
                      <p className='font-semibold'>{visit.diagnosis}</p>
                    </div>
                    <div className='col-span-2'>
                      <p className='text-sm text-gray-600'>Prescription</p>
                      <p className='font-semibold'>{visit.prescription}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className='mt-12 pt-6 border-t text-center text-sm text-gray-600'>
          <p>This is an official health report generated by ArogyaMitra</p>
          <p className='mt-1'>For any queries, please contact your ASHA worker</p>
        </div>
      </div>
    </div>
  )
}

export default AshaIndividualReport
