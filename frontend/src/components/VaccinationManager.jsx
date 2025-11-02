import React, { useState } from 'react'
import { Plus, ExternalLink, Trash2 } from 'lucide-react'

const VaccinationManager = ({ vaccinations, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [newVaccine, setNewVaccine] = useState({
    name: '',
    status: '',
    date: '',
    nextDueDate: ''
  })

  const commonVaccines = [
    'BCG',
    'Hepatitis B',
    'DPT (Diphtheria, Pertussis, Tetanus)',
    'Polio (OPV/IPV)',
    'Measles',
    'MMR (Measles, Mumps, Rubella)',
    'Typhoid',
    'Hepatitis A',
    'Varicella (Chickenpox)',
    'HPV (Human Papillomavirus)',
    'Influenza (Flu)',
    'Pneumococcal',
    'Rotavirus',
    'COVID-19',
    'Tetanus Toxoid (TT)',
    'Other'
  ]

  const vaccinationStatuses = [
    'Completed',
    'Partially Completed',
    'Pending',
    'Not Taken',
    'Overdue'
  ]

  const handleAddVaccine = () => {
    if (newVaccine.name && newVaccine.status) {
      const updatedVaccinations = [...(vaccinations || []), newVaccine]
      onUpdate(updatedVaccinations)
      setNewVaccine({ name: '', status: '', date: '', nextDueDate: '' })
      setIsAdding(false)
    }
  }

  const handleDeleteVaccine = (index) => {
    const updatedVaccinations = vaccinations.filter((_, i) => i !== index)
    onUpdate(updatedVaccinations)
  }

  return (
    <div className='bg-white rounded-lg border border-gray-200 p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-xl font-semibold text-gray-800'>Vaccination Records</h3>
        <a 
          href='https://www.nhp.gov.in/universal-immunisation-programme_pg'
          target='_blank'
          rel='noreferrer'
          className='flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 underline'
        >
          <ExternalLink className='w-4 h-4' />
          View Govt. Vaccination Chart
        </a>
      </div>

      {/* Vaccination List */}
      {vaccinations && vaccinations.length > 0 ? (
        <div className='space-y-3 mb-4'>
          {vaccinations.map((vaccine, index) => (
            <div key={index} className='border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors'>
              <div className='flex justify-between items-start'>
                <div className='flex-1'>
                  <div className='flex items-center gap-2 mb-2'>
                    <h4 className='font-semibold text-gray-800'>{vaccine.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      vaccine.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      vaccine.status === 'Partially Completed' ? 'bg-yellow-100 text-yellow-700' :
                      vaccine.status === 'Pending' ? 'bg-blue-100 text-blue-700' :
                      vaccine.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {vaccine.status}
                    </span>
                  </div>
                  <div className='text-sm text-gray-600 space-y-1'>
                    {vaccine.date && <p>Date Taken: <span className='font-medium'>{vaccine.date}</span></p>}
                    {vaccine.nextDueDate && <p>Next Due: <span className='font-medium'>{vaccine.nextDueDate}</span></p>}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteVaccine(index)}
                  className='text-red-500 hover:text-red-700 p-1'
                  title='Delete vaccine record'
                >
                  <Trash2 className='w-4 h-4' />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-500 text-sm mb-4'>No vaccination records added yet.</p>
      )}

      {/* Add Vaccine Form */}
      {isAdding ? (
        <div className='border border-gray-300 rounded-lg p-4 bg-gray-50'>
          <h4 className='font-semibold mb-3'>Add Vaccination Record</h4>
          <div className='space-y-3'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Vaccine Name *</label>
              <select
                value={newVaccine.name}
                onChange={(e) => setNewVaccine({ ...newVaccine, name: e.target.value })}
                className='w-full border border-gray-300 rounded-md p-2 text-sm'
              >
                <option value=''>Select Vaccine</option>
                {commonVaccines.map((vaccine, idx) => (
                  <option key={idx} value={vaccine}>{vaccine}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Vaccination Status *</label>
              <select
                value={newVaccine.status}
                onChange={(e) => setNewVaccine({ ...newVaccine, status: e.target.value })}
                className='w-full border border-gray-300 rounded-md p-2 text-sm'
              >
                <option value=''>Select Status</option>
                {vaccinationStatuses.map((status, idx) => (
                  <option key={idx} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Date Taken</label>
              <input
                type='date'
                value={newVaccine.date}
                onChange={(e) => setNewVaccine({ ...newVaccine, date: e.target.value })}
                className='w-full border border-gray-300 rounded-md p-2 text-sm'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Next Due Date</label>
              <input
                type='date'
                value={newVaccine.nextDueDate}
                onChange={(e) => setNewVaccine({ ...newVaccine, nextDueDate: e.target.value })}
                className='w-full border border-gray-300 rounded-md p-2 text-sm'
              />
            </div>

            <div className='flex gap-2 pt-2'>
              <button
                onClick={handleAddVaccine}
                className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium'
              >
                Add Vaccine
              </button>
              <button
                onClick={() => {
                  setIsAdding(false)
                  setNewVaccine({ name: '', status: '', date: '', nextDueDate: '' })
                }}
                className='border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className='flex items-center gap-2 text-primary hover:text-primary-dark font-medium text-sm'
        >
          <Plus className='w-4 h-4' />
          Add Vaccination Record
        </button>
      )}

      {/* Government Reference */}
      <div className='mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3'>
        <p className='text-xs text-blue-800'>
          <strong>Note:</strong> Please refer to the Universal Immunisation Programme (UIP) schedule for recommended vaccinations. 
          Click the link above to view the official government vaccination chart.
        </p>
      </div>
    </div>
  )
}

export default VaccinationManager
