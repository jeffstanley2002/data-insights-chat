# Data Insights Chat - Student Survey Analysis

A real-time AI-powered chat interface for analyzing student survey data about academic stress and mental health. This application allows users to query and explore insights from survey data through natural language conversations.

![Data Insights Chat Interface](example.png)

## 🚀 Features

- **Natural Language Querying**: Ask questions about the survey data 
- **Real-time Analysis**: Get instant insights about student stress, mental health, and support services
- **Statistical Analysis**: View percentages and frequency distributions of responses
- **Professional UI**: Clean, responsive interface with dark/light mode support

## 🛠️ Technical Implementation

### Architecture

- **Frontend**: Next.js 14 (App Router) with React and TypeScript
- **AI Integration**: Vercel AI SDK with Google's Gemini Pro
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks for local state
- **Data Processing**: Server-side functions for data analysis

### Key Libraries & Tools

- `@vercel/ai`: For AI chat functionality
- `@ai-sdk/google`: Google Gemini Pro integration
- `shadcn/ui`: UI component library
- `next-themes`: Dark mode implementation
- `lucide-react`: Icon system
- `tailwindcss`: Utility-first CSS
- `zod`: Runtime type checking

## 💡 Approach & Design Decisions

### 1. Data Processing
- Structured survey data for efficient querying
- Server actions for data operations
- Type-safe data handling with TypeScript

### 2. AI Integration
- System prompts for consistent analysis
- Tool-based approach for data access
- Temperature control for reliable responses
- Structured output format for better readability

### 3. User Interface
- Professional, clean design
- Responsive layout
- Loading states for better UX
- Welcome message with example queries
- Theme switching capability

### 4. Performance Considerations
- Optimized re-renders
- Efficient data fetching
- Proper error handling
- Response streaming

## 🎯 Challenges & Solutions

1. **AI Response Formatting**
   - Challenge: Inconsistent response formats
   - Solution: Implemented structured system prompts and response templates

2. **Data Analysis Accuracy**
   - Challenge: Getting precise statistics
   - Solution: Added helper functions for calculations and sorting

3. **UI/UX Balance**
   - Challenge: Professional look while maintaining usability
   - Solution: Used shadcn/ui components with custom styling

4. **Real-time Updates**
   - Challenge: Smooth loading states
   - Solution: Implemented skeleton loading and proper state management

## 🔄 Limitations & Future Improvements

1. **Current Limitations**
   - Fixed dataset (no real-time updates)
   - Limited to predefined survey questions
   - No data visualization yet

2. **Planned Improvements**
   - Add interactive charts and graphs
   - Implement data export functionality
   - Add more advanced statistical analysis
   - Support for dynamic data updates

## 🚦 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/data-insights-chat.git
```

2. Navigate to the project directory:
```bash
cd data-insights-chat
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env.local` file in the root directory and add your Google Gemini API key:
```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 💬 Usage Examples

The chatbot can answer questions about the student survey data. Try asking:

- "What are the most common sources of academic stress?"
- "How many students rated their mental health below 5?"
- "What strategies are most used to manage stress?"
- "What support services do students want?"

## 🔍 Implementation Details

### Data Analysis
- Server-side actions process the survey data
- Responses are analyzed in real-time using Google's Gemini Pro
- Statistical calculations include percentages and frequency distributions

### UI Components
- Built with shadcn/ui for a professional look
- Dark/light theme support with next-themes
- Responsive design for all screen sizes
- Loading states and animations for better UX

### AI Integration
- Uses Vercel AI SDK for streaming responses
- Structured prompts ensure consistent analysis
- Tool-based approach for accurate data access
- Temperature control for reliable outputs
