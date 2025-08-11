# FightIQ - AI-Powered MMA Analytics Platform

FightIQ is a comprehensive AI-powered fighter analysis platform designed to provide performance insights and training recommendations for mixed martial arts athletes and coaches.

## Features

### 🥊 Fighter Management
- Complete fighter profile management (CRUD operations)
- Fighter statistics tracking (age, weight, reach, record, fighting style)
- Photo management and profile visualization

### 🧠 AI-Powered Analysis
- Intelligent fighting style analysis using ML algorithms
- Performance scoring across 6 key metrics:
  - Striking accuracy and power
  - Grappling and ground game
  - Cardiovascular endurance
  - Defensive capabilities
  - Aggression levels
  - Technical execution
- Radar chart visualizations for comprehensive style breakdown

### 📊 Performance Tracking
- Historical performance data tracking
- Trend analysis with interactive line charts
- Fight-by-fight performance progression
- Performance prediction capabilities

### 💡 Training Recommendations
- AI-generated training suggestions based on analysis
- Personalized workout plans targeting weak areas
- Strength enhancement recommendations
- Training schedule management

### 📈 Analytics Dashboard
- Real-time statistics and metrics
- Fighter comparison tools
- Progress tracking and improvement metrics
- Performance trend analysis

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Recharts** for data visualization
- **TanStack Query** for state management
- **wouter** for routing

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **PostgreSQL** database with Neon integration
- **Zod** for schema validation
- RESTful API design

### Development Tools
- **Vite** for build tooling
- **ESBuild** for fast compilation
- **TypeScript** for type safety
- **Replit** development environment

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── lib/           # Utilities and configurations
│   │   └── hooks/         # Custom React hooks
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   └── storage.ts        # Data storage layer
├── shared/               # Shared types and schemas
│   └── schema.ts        # Database schema definitions
└── components.json      # shadcn/ui configuration
```

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/oemer95/fightIQ.git
cd fightIQ
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## API Endpoints

### Fighters
- `GET /api/fighters` - Get all fighters
- `GET /api/fighters/:id` - Get specific fighter
- `POST /api/fighters` - Create new fighter
- `PUT /api/fighters/:id` - Update fighter
- `DELETE /api/fighters/:id` - Delete fighter

### Analysis
- `GET /api/fighters/:id/analyses` - Get fighter analyses
- `GET /api/fighters/:id/analysis/latest` - Get latest analysis
- `POST /api/analyses` - Create new analysis
- `POST /api/fighters/:id/analyze` - Generate AI analysis

### Training & Performance
- `GET /api/fighters/:id/training` - Get training sessions
- `POST /api/training` - Create training session
- `GET /api/fighters/:id/performance` - Get performance data
- `POST /api/performance` - Add performance data

## Features in Detail

### AI Analysis Engine
The platform includes a sophisticated AI analysis system that evaluates fighters across multiple dimensions:

- **Style Classification**: Automatically categorizes fighting styles (Striker, Grappler, Mixed, etc.)
- **Performance Prediction**: Uses historical data to predict future performance
- **Weakness Identification**: Identifies areas needing improvement
- **Training Plan Generation**: Creates customized training recommendations

### Data Visualization
- **Radar Charts**: Multi-dimensional skill analysis
- **Line Charts**: Performance trends over time
- **Progress Bars**: Individual skill level indicators
- **Comparison Tools**: Side-by-side fighter analysis

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Theme switching capability
- **Real-time Updates**: Live data synchronization
- **Intuitive Navigation**: Easy-to-use interface

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with ❤️ using modern web technologies
- Designed for the MMA community
- Powered by AI and machine learning

## Contact

Project Link: [https://github.com/oemer95/fightIQ](https://github.com/oemer95/fightIQ)

---

**FightIQ** - Revolutionizing fighter analysis through artificial intelligence.