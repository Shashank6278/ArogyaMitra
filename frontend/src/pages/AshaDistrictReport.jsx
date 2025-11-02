import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const AshaDistrictReport = () => {
  const { district } = useParams()
  const { backendUrl, ashaToken } = useContext(AppContext)
  const [records, setRecords] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDistrictData = async () => {
      try {
        const { data } = await axios.get(backendUrl + '/api/health/all-records', { 
          headers: { token: ashaToken } 
        })
        if (data.success) {
          // Filter by district
          const districtRecords = data.records.filter(r => r.district === district)
          setRecords(districtRecords)
          calculateStats(districtRecords)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error('Failed to fetch district data')
      } finally {
        setLoading(false)
      }
    }

    if (ashaToken && district) {
      fetchDistrictData()
    }
  }, [district, ashaToken, backendUrl])

  const calculateStats = (records) => {
    const totalUsers = records.length
    const maleCount = records.filter(r => r.gender === 'Male').length
    const femaleCount = records.filter(r => r.gender === 'Female').length
    
    // Blood group distribution
    const bloodGroups = {}
    records.forEach(r => {
      if (r.bloodGroup) {
        bloodGroups[r.bloodGroup] = (bloodGroups[r.bloodGroup] || 0) + 1
      }
    })

    // Vaccination status
    let vaccinatedCount = 0
    let totalVaccinations = 0
    records.forEach(r => {
      if (r.vaccinations && r.vaccinations.length > 0) {
        vaccinatedCount++
        totalVaccinations += r.vaccinations.length
      }
    })

    // Medical conditions
    const conditions = {}
    records.forEach(r => {
      if (r.medicalConditions && r.medicalConditions !== 'None reported') {
        const conds = r.medicalConditions.split(',').map(c => c.trim())
        conds.forEach(cond => {
          conditions[cond] = (conditions[cond] || 0) + 1
        })
      }
    })

    // Age distribution (if available)
    const ageGroups = {
      '0-18': 0,
      '19-35': 0,
      '36-50': 0,
      '51+': 0
    }

    setStats({
      totalUsers,
      maleCount,
      femaleCount,
      bloodGroups,
      vaccinatedCount,
      totalVaccinations,
      conditions,
      ageGroups
    })
  }

  const printReport = () => {
    window.print()
  }

  if (loading) {
    return <div className='min-h-screen flex items-center justify-center'>Loading district report...</div>
  }

  if (!stats) {
    return <div className='min-h-screen flex items-center justify-center'>No data available</div>
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 print:bg-white'>
      <div className='max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 print:shadow-none'>
        {/* Header */}
        <div className='border-b-2 border-primary pb-4 mb-6'>
          <div className='flex justify-between items-start'>
            <div>
              <h1 className='text-3xl font-bold text-primary'>District Health Report</h1>
              <p className='text-xl text-gray-700 mt-2'>{district} District</p>
              <p className='text-gray-600 mt-1'>ArogyaMitra - Rural Healthcare System</p>
            </div>
            <button 
              onClick={printReport}
              className='bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark print:hidden'
            >
              Print Report
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
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Summary Statistics</h2>
          <div className='grid grid-cols-4 gap-4'>
            <div className='bg-blue-50 p-6 rounded-lg text-center'>
              <p className='text-sm text-gray-600 mb-2'>Total Users</p>
              <p className='text-4xl font-bold text-blue-600'>{stats.totalUsers}</p>
            </div>
            <div className='bg-green-50 p-6 rounded-lg text-center'>
              <p className='text-sm text-gray-600 mb-2'>Male</p>
              <p className='text-4xl font-bold text-green-600'>{stats.maleCount}</p>
            </div>
            <div className='bg-pink-50 p-6 rounded-lg text-center'>
              <p className='text-sm text-gray-600 mb-2'>Female</p>
              <p className='text-4xl font-bold text-pink-600'>{stats.femaleCount}</p>
            </div>
            <div className='bg-purple-50 p-6 rounded-lg text-center'>
              <p className='text-sm text-gray-600 mb-2'>Vaccinated</p>
              <p className='text-4xl font-bold text-purple-600'>{stats.vaccinatedCount}</p>
            </div>
          </div>
        </div>

        {/* Blood Group Distribution */}
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Blood Group Distribution</h2>
          <div className='bg-gray-50 p-6 rounded-lg'>
            <div className='grid grid-cols-4 gap-4'>
              {Object.entries(stats.bloodGroups).map(([group, count]) => (
                <div key={group} className='text-center'>
                  <div className='bg-white rounded-lg p-4 shadow'>
                    <p className='text-2xl font-bold text-primary'>{group}</p>
                    <p className='text-gray-600 mt-2'>{count} users</p>
                    <div className='mt-2 bg-primary h-2 rounded' style={{width: `${(count/stats.totalUsers)*100}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vaccination Statistics */}
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Vaccination Statistics</h2>
          <div className='grid grid-cols-3 gap-4'>
            <div className='bg-green-50 p-6 rounded-lg'>
              <p className='text-sm text-gray-600 mb-2'>Users Vaccinated</p>
              <p className='text-3xl font-bold text-green-600'>{stats.vaccinatedCount}</p>
              <p className='text-sm text-gray-500 mt-1'>
                {((stats.vaccinatedCount/stats.totalUsers)*100).toFixed(1)}% of total
              </p>
            </div>
            <div className='bg-blue-50 p-6 rounded-lg'>
              <p className='text-sm text-gray-600 mb-2'>Total Vaccinations</p>
              <p className='text-3xl font-bold text-blue-600'>{stats.totalVaccinations}</p>
              <p className='text-sm text-gray-500 mt-1'>Administered</p>
            </div>
            <div className='bg-yellow-50 p-6 rounded-lg'>
              <p className='text-sm text-gray-600 mb-2'>Pending</p>
              <p className='text-3xl font-bold text-yellow-600'>{stats.totalUsers - stats.vaccinatedCount}</p>
              <p className='text-sm text-gray-500 mt-1'>Users need vaccination</p>
            </div>
          </div>
        </div>

        {/* Common Medical Conditions */}
        {Object.keys(stats.conditions).length > 0 && (
          <div className='mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Common Medical Conditions</h2>
            <div className='bg-gray-50 p-6 rounded-lg'>
              <div className='space-y-3'>
                {Object.entries(stats.conditions)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 10)
                  .map(([condition, count]) => (
                    <div key={condition} className='flex items-center justify-between'>
                      <div className='flex-1'>
                        <p className='font-medium text-gray-700'>{condition}</p>
                        <div className='mt-1 bg-gray-200 rounded-full h-2'>
                          <div 
                            className='bg-red-500 h-2 rounded-full' 
                            style={{width: `${(count/stats.totalUsers)*100}%`}}
                          ></div>
                        </div>
                      </div>
                      <div className='ml-4 text-right'>
                        <p className='text-2xl font-bold text-red-600'>{count}</p>
                        <p className='text-xs text-gray-500'>cases</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Village-wise Distribution */}
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Village-wise Distribution</h2>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-primary text-white'>
                  <th className='p-3 text-left'>Village</th>
                  <th className='p-3 text-center'>Total Users</th>
                  <th className='p-3 text-center'>Vaccinated</th>
                  <th className='p-3 text-center'>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {[...new Set(records.map(r => r.village))].map((village, i) => {
                  const villageRecords = records.filter(r => r.village === village)
                  const vaccinated = villageRecords.filter(r => r.vaccinations && r.vaccinations.length > 0).length
                  return (
                    <tr key={i} className='border-b hover:bg-gray-50'>
                      <td className='p-3 font-medium'>{village || 'Not specified'}</td>
                      <td className='p-3 text-center'>{villageRecords.length}</td>
                      <td className='p-3 text-center'>{vaccinated}</td>
                      <td className='p-3 text-center'>
                        <span className='px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm'>
                          {((vaccinated/villageRecords.length)*100).toFixed(1)}%
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
        <div className='mb-8 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded'>
          <h2 className='text-xl font-semibold text-gray-800 mb-3'>Recommendations</h2>
          <ul className='space-y-2 text-gray-700'>
            <li className='flex items-start'>
              <span className='text-yellow-600 mr-2'>•</span>
              <span>Focus on vaccination drives in villages with low coverage</span>
            </li>
            <li className='flex items-start'>
              <span className='text-yellow-600 mr-2'>•</span>
              <span>Conduct awareness programs for common medical conditions</span>
            </li>
            <li className='flex items-start'>
              <span className='text-yellow-600 mr-2'>•</span>
              <span>Regular health checkup camps in underserved areas</span>
            </li>
            <li className='flex items-start'>
              <span className='text-yellow-600 mr-2'>•</span>
              <span>Maintain updated health records for all users</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className='mt-12 pt-6 border-t text-center text-sm text-gray-600'>
          <p>This is an official district health report generated by ArogyaMitra</p>
          <p className='mt-1'>For any queries, please contact the District Health Office</p>
        </div>
      </div>
    </div>
  )
}

export default AshaDistrictReport
