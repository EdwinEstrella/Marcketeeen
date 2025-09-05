import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const Chart = ({ type, data, width, height, colors }) => {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" />
            <XAxis dataKey="name" stroke="#A3A3A3" />
            <YAxis stroke="#A3A3A3" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#262626', 
                border: '1px solid #2F2F2F',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="value" fill={colors?.[0] || '#9E7FFF'} />
          </BarChart>
        )
      
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" />
            <XAxis dataKey="name" stroke="#A3A3A3" />
            <YAxis stroke="#A3A3A3" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#262626', 
                border: '1px solid #2F2F2F',
                borderRadius: '8px'
              }}
            />
            <Line type="monotone" dataKey="value" stroke={colors?.[0] || '#f472b6'} strokeWidth={2} />
          </LineChart>
        )
      
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors?.[index % colors.length] || '#9E7FFF'} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#262626', 
                border: '1px solid #2F2F2F',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        )
      
      default:
        return null
    }
  }

  return (
    <ResponsiveContainer width={width || '100%'} height={height || 300}>
      {renderChart()}
    </ResponsiveContainer>
  )
}

export default Chart
