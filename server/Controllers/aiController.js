const expressAsyncHandler = require("express-async-handler");
const Finance = require("../Models/financeModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateAIReport = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const transactions = await Finance.find({ user: userId })
    .populate("income")
    .populate("expense");

  if (!transactions || transactions.length === 0) {
    res.status(404);
    throw new Error("No transactions found for report generation");
  }

  // helper: format date as dd/mm/yy
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB"); // dd/mm/yyyy
  };

  const formattedData = transactions
    .map((t) => {
      if (t.isIncome && t.income) {
        return `Income: ${t.income.title} - ${t.income.ammount} on ${formatDate(
          t.income.createdAt
        )}`;
      } else if (t.expense) {
        return `Expense: ${t.expense.title} - ${t.expense.ammount} (Category: ${
          t.expense.category
        }) on ${formatDate(t.expense.createdAt)}`;
      }
    })
    .join("\n");

const prompt = `
You are a financial advisor. Based on the following transactions, write a 
personalized financial report with insights, spending patterns, and suggestions 
for saving.

Transactions:
${formattedData}

Formatting Instructions (very important):
1. The top heading ("Personalized Financial Report") should be **large, bold, 
   and styled in green (#1b5e20)** so it stands out.
-Use Tables for better understanding

2. Use clear section headers like "Summary", "Spending Analysis", 
   "Month-on-Month Comparison", "Savings Suggestions", and "Conclusion".  
   - These should be **highlighted with a green underline or background** so they 
     are visually distinct.
3. For "Savings Suggestions" and "Conclusion", add a **light green background 
   box (#e8f5e9)** or use bold + underline to make them more eye-catching.
4. Use **color cues** for amounts:  
   - Income / Net Savings → **green** (#2e7d32)  
   - Expenses → **red** (#c62828)  
   - Warnings / discrepancies → **orange** (#ef6c00)  
5. Use bullet points and short paragraphs for clarity.
Everything is in ruppees
6. Ensure the final output is valid **HTML with inline styles** (no markdown fences).

Provide the report only in HTML.
`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  let report = result.response.text();

  // remove markdown ```html ... ```
  // report = report.replace(/```html|```/g, "");
// console.log(formattedData)
  res.json(report);
});

//Saving Advisorr

const savingAdvisor = expressAsyncHandler(async (req , res) => {

  const userId = req.user._id;
  // res.json({
  //   msg : "Helloo"
  // })
  const { goal, amount } = req.body;

  // console.log(goal )

  if (!goal || !amount) {
    res.status(400);
    throw new Error("Please provide a goal and amount");
  }

  const transactions = await Finance.find({ user: userId })
    .populate("income")
    .populate("expense");

  if (!transactions || transactions.length === 0) {
    res.status(404);
    throw new Error("No transactions found for this user");
  }

  // console.log(transactions)

  // helper: format date as dd/mm/yy
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB"); // dd/mm/yyyy
  };

  const formattedData = transactions
    .map((t) => {
      if (t.isIncome && t.income) {
        return `Income: ${t.income.title} - ${t.income.ammount} on ${formatDate(
          t.income.createdAt
        )}`;
      } else if (t.expense) {
        return `Expense: ${t.expense.title} - ${t.expense.ammount} (Category: ${
          t.expense.category
        }) on ${formatDate(t.expense.createdAt)}`;
      }
    })
    .join("\n");

    const prompt = `
      User has set a financial goal: "${goal}" with target amount ₹${amount}.
      Here is the complete history of the user's transactions till date: ${formattedData}.

      Based on this data:
        1. A **main title** at the top (e.g., "Personalized Saving Plan for "${goal}"") styled in bold, large font, and centered.  
      - Analyze the user’s income sources and spending patterns but keep it short
      - Identify unnecessary or avoidable expenses 
      - Create a clear, actionable saving plan for the user
      - Provide a realistic timeline to reach the goal
      - Mention practical steps for cutting down expenses
      - Recommend budget allocation strategies
      - Highlight lifestyle or habit changes if required
      - Be encouraging and motivational in tone
      6. Ensure the final output is valid **HTML with inline styles** (no markdown fences).

      Provide the report only in HTML.
      **Formatting instructions for HTML output:**
  - Use clear headings with <h2> or <h3> tags (e.g., "Income Analysis", "Expense Review", "Saving Plan", "Timeline").
  - Highlight the saving plan and timeline using <div> with background-color (light green background 
   box (#e8f5e9) for saving plan , light blue for timeline).
  - Use color cues for positive tips (green), warnings (red/orange), and motivational notes (blue/purple).
  - use bullet points 
  - Keep everything structured in sections with proper spacing and inline styles.
  - Ensure the final output is valid HTML only (no markdown fences).
      `;

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(prompt);
      let plan = result.response.text();

      // remove markdown ```html ... ```
      // report = report.replace(/```html|```/g, "");
    // console.log(formattedData)
      res.json(plan);



})

//Chat feature 
const personalChat = expressAsyncHandler(async (req , res) => {

  const userId = req.user._id 
  const { userQuery } = req.body 

  // console.log(userQuery)

  const transactions = await Finance.find({ user: userId })
    .populate("income")
    .populate("expense");

  if (!transactions || transactions.length === 0) {
    res.status(404);
    throw new Error("No transactions found for this user");
  }


  if(!userQuery) {
    res.status(400)
    throw new Error ("No Message Is there!")
  }

   // helper: format date as dd/mm/yy
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB"); // dd/mm/yyyy
  };

  const formattedData = transactions
    .map((t) => {
      if (t.isIncome && t.income) {
        return `Income: ${t.income.title} - ${t.income.ammount} on ${formatDate(
          t.income.createdAt
        )}`;
      } else if (t.expense) {
        return `Expense: ${t.expense.title} - ${t.expense.ammount} (Category: ${
          t.expense.category
        }) on ${formatDate(t.expense.createdAt)}`;
      }
    })
    .join("\n");

    const prompt = `You are a financial assistant AI.  
      You will always answer queries based on the user’s financial data provided below.  

      --- USER FINANCIAL DATA ---
      ${formattedData}
      --- END OF DATA ---

      --- USER MESSAGE ---
      ${userQuery}
      --- END OF MESSAGE ---

      Guidelines for your response:
      1. Use the financial data when answering — tailor responses accordingly.  
      2. If the data is missing or unclear, ask clarifying questions.  
      3. Keep your answers simple, clear, and easy to understand.  
      4. Do not repeat the user’s message, directly provide helpful advice.  
      5. If calculations are needed, explain step by step.  

      Now provide the best possible answer to the user’s query.
      `;

      // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const aiResponse = await model.generateContent(prompt);
      let aiMessage = aiResponse.response.text();

      // remove markdown ```html ... ```
      // report = report.replace(/```html|```/g, "");
    // console.log(formattedData)
      res.json(aiMessage);



})

module.exports = { generateAIReport , savingAdvisor , personalChat};
