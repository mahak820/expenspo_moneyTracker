import React, { useState } from 'react';
import { TrendingUp, DollarSign, CreditCard, Eye, Plus, BarChart3 , Calendar, Activity, Clock, PieChartIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addIncome, getAllIncomes } from '../features/income/incomeSlice';
import { addExpense, getAllExpenses } from '../features/expense/expenseSlice';
import { toast } from 'react-toastify';
import { getallTransactions } from '../features/transaction/transactionSlice';
import PieChart from '../components/DashboardComponents/PieChart';
import BarChart from '../components/DashboardComponents/BarChart';

const Dashboard = () => {
   const [isOpenIncome, setIsOpenIncome] = useState(false);
   const [isOpenExpense, setIsOpenExpense] = useState(false);

   const [formData , setFormData] = useState({
    title : '' , 
    ammount : '' , 
    category : ''
   })

  //  const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  const handleInputChange = (e) => {

    const {name , value} = e.target 
    setFormData(prev => ({
      ...prev ,
      [name] : value
    }))

  }

  const toggleModal = () => setIsOpenIncome(!isOpenIncome);
  const toggleModalExp = () => setIsOpenExpense(!isOpenExpense);
  const closeModal = () => {setIsOpenIncome(false) , setIsOpenExpense(false)};

  const [render , setRender] = useState(false)
  // const [last30DaysExpense , setLast30DaysExpense] = useState([{
  //   date : '' , 
  //   ammount : ''
  // }])

  const dispatch = useDispatch()

  const {allIncomes , isLoading , isSuccess} = useSelector(state => state.income) 
  const {allExpenses } = useSelector(state => state.expense) 
  const {transactions} = useSelector(state => state.transaction)

  useEffect(() => {
    dispatch(getAllIncomes())
    dispatch(getAllExpenses())
    dispatch(getallTransactions())
    
  } , [dispatch , render])

  
  // console.log(allIncomes)
  // console.log(allExpenses)
  // console.log(transactions)
  
  const totalIncome = allIncomes?.reduce((sum , income) => sum + income?.ammount , 0)
  const totalExpense = allExpenses?.reduce((sum , income) => sum + income?.ammount , 0)
  const totalBalance = totalIncome-totalExpense
  
  // const setDetails = () => {
  //   var totalIncome = allIncomes?.reduce((sum , income) => sum + income?.ammount , 0)
  //   var totalExpense = allExpenses?.reduce((sum , income) => sum + income?.ammount , 0)
  //   var totalBalance = totalIncome-totalExpense
  // }
  
  //DATE to HOUR
  const dateToHour = (createdAt) => {
    const createdDate  = new Date(createdAt)
    // Get current time in IST
    const now = new Date();
    
    // Shift both times to IST by adding 5.5 hours
    const createdIST = new Date(createdDate.getTime() + (5.5 * 60 * 60 * 1000));
    const nowIST = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
    
    // Calculate difference in milliseconds
    const diffMs = nowIST - createdIST;
    
    // Convert milliseconds to hours
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    return diffHours
  }
  
  //SET LAST 30 DAYS EXPENSE
      const getLast30DaysExpenses = (allExpenses) => {
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 10);

        const filtered = allExpenses.filter(exp => {
          const createdAtDate = new Date(exp.createdAt);
          return createdAtDate >= thirtyDaysAgo && createdAtDate <= today;
        });

        return filtered;
      };

      //Group Data for barchart
      const groupByDate = (data) => {
        const map = {};

        data.forEach(exp => {
          const date = new Date(exp.createdAt);
          const label = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

          if (map[label]) {
            map[label] += exp.ammount;
          } else {
            map[label] = exp.ammount;
          }
        });

        return {
          labels: Object.keys(map),
          data: Object.values(map),
        };
      };

      const last10Days = getLast30DaysExpenses(allExpenses);
      const chartData = groupByDate(last10Days);

//       console.log(chartData.labels);
// console.log(chartData.data);

//Average Of Last 10 days \
const avgLast10Days = (last10Days?.reduce((sum , expense) => sum + expense?.ammount ,  0))/10

// console.log(avgLast10Days)




  //Add Income
  const handleAddIncome = async(e) => {
    e.preventDefault()
    // console.log(formData)
    await dispatch(addIncome(formData))
    setRender(!render)
    closeModal()
    toast.success("Income Added")
    setFormData({
      title : '', 
      ammount : ''
    })
  }

  //Add EXPENSE
  const handleAddExpense = async(e) => {
    e.preventDefault()
    // console.log(formData)
    await dispatch(addExpense(formData))
    setRender(!render)
    closeModal()
    toast.success("Expense Added")

    setFormData({
      title : '', 
      ammount : '' ,
      category : ''
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/90 to-[#0081A7]/5 p-6 ml-0 sm:ml-0 pt-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome to <span className="text-[#0081A7]">Expenso</span>
        </h1>
        <p className="text-gray-600">Track your finances with ease and precision</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Income */}
        <div className="group relative bg-white/95 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0081A7] to-[#00B4D8] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-[#0081A7]/10 to-[#00B4D8]/10 rounded-xl group-hover:from-[#0081A7]/20 group-hover:to-[#00B4D8]/20 transition-all duration-300 border border-[#0081A7]/20">
                <TrendingUp className="w-6 h-6 text-[#0081A7]" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-500 mb-1">Total Income</p>
                <p className="text-3xl font-bold text-[#0081A7]">₹{allIncomes?.reduce((sum , income) => sum + income?.ammount , 0)}</p>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-[#00B4D8] font-medium">+8.2%</span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </div>

        {/* Total Balance */}
        <div className="group relative bg-white/95 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00B4D8] to-[#0081A7] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-[#00B4D8]/10 to-[#0081A7]/10 rounded-xl group-hover:from-[#00B4D8]/20 group-hover:to-[#0081A7]/20 transition-all duration-300 border border-[#00B4D8]/20">
                <DollarSign className="w-6 h-6 text-[#00B4D8]" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-500 mb-1">Total Balance</p>
                <p className="text-3xl font-bold text-[#00B4D8]">₹{totalBalance}</p>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-[#0081A7] font-medium">+12.5%</span>
              <span className="text-gray-500 ml-2">growth this month</span>
            </div>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="group relative bg-white/95 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50">
          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl group-hover:from-red-100 group-hover:to-pink-100 transition-all duration-300 border border-red-200/50">
                <CreditCard className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-500 mb-1">Total Expenses</p>
                <p className="text-3xl font-bold text-red-600">₹{totalExpense}</p>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-red-500 font-medium">-2.1%</span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Actions Panel */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-gray-200/50">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4">
            <button onClick={toggleModal} className="p-4 bg-gradient-to-r from-[#0081A7] to-[#00B4D8] text-white rounded-xl hover:from-[#0081A7]/90 hover:to-[#00B4D8]/90 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg border border-[#0081A7]/20">
              <Plus className="w-5 h-5 mx-auto mb-2" />
              <span className="text-sm font-medium">Add Income</span>
            </button>
            <button onClick={toggleModalExp} className="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
              <CreditCard className="w-5 h-5 mx-auto mb-2" />
              <span className="text-sm font-medium">Add Expense</span>
            </button>
            <button className="p-4 bg-gradient-to-r from-[#00B4D8] to-[#0081A7] text-white rounded-xl hover:from-[#00B4D8]/90 hover:to-[#0081A7]/90 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
              <Eye className="w-5 h-5 mx-auto mb-2" />
              <span className="text-sm font-medium">View Reports</span>
            </button>
          </div>
        </div>

        {/* Financial Overview - Pie Chart */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            {
              totalIncome ? ( <PieChart income={totalIncome} expenses={totalExpense} balance={totalBalance} />
)
                          : (
                            <div className="h-48 w-100 bg-gradient-to-br from-[#0081A7]/5 to-[#00B4D8]/5 rounded-lg flex items-center justify-center border border-[#0081A7]/10">
                              <div className="text-center">
                                <PieChartIcon className="w-12 h-12 text-[#0081A7] mx-auto mb-2" />
                                <div className="text-[#0081A7] text-sm font-medium">Pie Chart</div>
                                <div className="text-gray-500 text-xs">Add Income/Expense to visualize the data</div>
                              </div>
                            </div>
                          )
            }

          </div>
          
        </div>

        {/* Recent Transactions */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Recent Transactions</h3>
            <Activity className="w-5 h-5 text-[#0081A7]" />
          </div>
          <div className="space-y-3">
            {

              transactions?.length > 0 ? (
                transactions.slice(0 , 5).map((transaction) => {
                    return (
                      transaction.isIncome ? (
                         <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#0081A7]/5 to-[#00B4D8]/5 rounded-lg hover:from-[#0081A7]/10 hover:to-[#00B4D8]/10 transition-all duration-200 border border-[#0081A7]/10">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-[#00B4D8] rounded-full mr-3"></div>
                            <span className="text-sm text-gray-700 font-medium">{transaction?.income?.title}</span>
                          </div>
                          <span className="text-sm font-semibold text-[#00B4D8]">+₹{transaction?.income?.ammount}</span>
                        </div>
                      )
                      : (
                        <div className="flex items-center justify-between p-3 bg-red-50/80 rounded-lg hover:bg-red-50 transition-colors duration-200 border border-red-100">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                            <span className="text-sm text-gray-700 font-medium">{transaction?.expense?.title}</span>
                          </div>
                          <span className="text-sm font-semibold text-red-600">-₹{transaction?.expense?.ammount}</span>
                        </div>
                      )
                       
                    )
                })
              )
              : (<div className="flex flex-col items-center justify-center gap-2 p-6 bg-red-50/50 border border-red-200 rounded-xl shadow-sm">
                  <Activity className="w-8 h-8 text-red-400" />
                  <h1 className="text-xl font-semibold text-gray-700">No Recent Activity yet</h1>
                  <p className="text-sm text-gray-500">Start Adding your transaction to see them here.</p>
                </div>)

            }
            


            
            
            
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Expenses */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Recent Expenses</h3>
            <Clock className="w-5 h-5 text-[#0081A7]" />
          </div>
          <div className="space-y-3">
            
            {
              allExpenses?.length>0 ? allExpenses?.slice(0,4).map((expense) => {
              
                return(
                  <div key={expense._id} className="flex items-center justify-between p-3 bg-red-50/80 rounded-lg hover:bg-red-50 transition-colors duration-200 border border-red-100">
                    <div className="flex items-center">
                      <div className="p-2 bg-red-100 rounded-lg mr-3">
                        <CreditCard className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{expense?.title}</p>
                        <p className="text-xs text-gray-500">{dateToHour(expense?.createdAt)} hours ago</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-red-600">-₹{expense?.ammount}</span>
            </div>
                )
              }) : (
                <div className="flex flex-col items-center justify-center gap-2 p-6 bg-red-50/50 border border-red-200 rounded-xl shadow-sm">
                  <CreditCard className="w-8 h-8 text-red-400" />
                  <h1 className="text-xl font-semibold text-gray-700">No transaction yet</h1>
                  <p className="text-sm text-gray-500">Start adding your expenses to see them here.</p>
                </div>
              )
            }
            
            
          </div>
        </div>

        {/* Last 10 Days Expenses - Bar Chart */}
<div className="group bg-white/95 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 border border-gray-200/50 overflow-hidden relative">
  {/* Subtle gradient overlay on hover */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#0081A7]/5 to-[#00B4D8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  
  <div className="relative z-10">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-2 sm:space-y-0">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-[#0081A7]/10 to-[#00B4D8]/10 rounded-xl group-hover:from-[#0081A7]/20 group-hover:to-[#00B4D8]/20 transition-all duration-300 border border-[#0081A7]/20">
          <BarChart3 className="w-5 h-5 text-[#0081A7]" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Last 10 Days Expenses</h3>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-gradient-to-r from-[#0081A7] to-[#00B4D8] rounded-full animate-pulse"></div>
        <span className="text-sm text-gray-500 font-medium">Live Data</span>
      </div>
    </div>
    
    <div className="h-48 bg-gradient-to-br from-[#0081A7]/5 to-[#00B4D8]/5 rounded-xl flex items-center justify-center border border-[#0081A7]/10 group-hover:border-[#0081A7]/20 transition-all duration-300 shadow-inner">
      <div className="w-full px-2 sm:px-4">
        <BarChart labels={chartData.labels} values={chartData.data} />
      </div>
    </div>
    
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      <div className="group/card text-center p-4 bg-gradient-to-br from-red-50/80 to-red-100/50 rounded-xl border border-red-100 hover:border-red-200 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md">
        <div className="flex items-center justify-center mb-2">
          <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full mr-2"></div>
          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Today</p>
        </div>
        <p className="text-lg font-bold text-red-600">₹{chartData?.data[0] || 0}</p>
        <div className="w-full bg-red-100 rounded-full h-1.5 mt-2">
          <div className="bg-gradient-to-r from-red-500 to-red-600 h-1.5 rounded-full transition-all duration-500" style={{width: '85%'}}></div>
        </div>
      </div>
      
      <div className="group/card text-center p-4 bg-gradient-to-br from-red-50/80 to-red-100/50 rounded-xl border border-red-100 hover:border-red-200 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md">
        <div className="flex items-center justify-center mb-2">
          <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full mr-2"></div>
          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Yesterday</p>
        </div>
        <p className="text-lg font-bold text-red-600">₹{chartData?.data[1] || 0}</p>
        <div className="w-full bg-red-100 rounded-full h-1.5 mt-2">
          <div className="bg-gradient-to-r from-red-500 to-red-600 h-1.5 rounded-full transition-all duration-500" style={{width: '70%'}}></div>
        </div>
      </div>
      
      <div className="group/card text-center p-4 bg-gradient-to-br from-[#0081A7]/10 to-[#00B4D8]/10 rounded-xl border border-[#0081A7]/20 hover:border-[#0081A7]/30 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md">
        <div className="flex items-center justify-center mb-2">
          <div className="w-3 h-3 bg-gradient-to-r from-[#0081A7] to-[#00B4D8] rounded-full mr-2"></div>
          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Average</p>
        </div>
        <p className="text-lg font-bold text-[#0081A7]">₹{Math.round(avgLast10Days) || 0}</p>
        <div className="w-full bg-[#0081A7]/20 rounded-full h-1.5 mt-2">
          <div className="bg-gradient-to-r from-[#0081A7] to-[#00B4D8] h-1.5 rounded-full transition-all duration-500" style={{width: '60%'}}></div>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>

{/*Indome Modal */}
      {isOpenIncome && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/70 w-full max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Add New Entry
            </h3>

            {/* Modal Form */}
            <form onSubmit={(e) => handleAddIncome(e)} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter title"
                  className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0081A7]/50 bg-gray-50 text-gray-800"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Ammount
                </label>
                <input
                  type="text"
                  id="ammount"
                  name="ammount"
                  value={formData.ammount}
                  onChange={handleInputChange}
                  placeholder="Enter title"
                  className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0081A7]/50 bg-gray-50 text-gray-800"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0081A7] to-[#00B4D8] hover:from-[#0081A7]/90 hover:to-[#00B4D8]/90 text-white font-medium py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                Add Income
              </button>
            </form>
          </div>
        </div>
      )}

{/*Expense Modal */}

{isOpenExpense && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/70 w-full max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
             Add New Expense
            </h3>

            {/* Modal Form */}
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter income title"
                  className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/100 bg-gray-50 text-gray-800"
                  required
                />
              </div>

              {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/100 bg-gray-50 text-gray-800"
                    required
                  >
                    <option value="" disabled>Select category</option>
                    <option value="food">Food</option>
                    <option value="rent">Rent</option>
                    <option value="travel">Travel</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="shopping">Shopping</option>
                    <option value="others">Others</option>
                  </select>
                </div>



              <div>
                <label htmlFor="ammount" className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  id="ammount"
                  name="ammount"
                  value={formData.ammount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/100 bg-gray-50 text-gray-800"
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleAddExpense}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
    
  );
};

export default Dashboard;