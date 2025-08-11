# FightIQ - Fighter Analysis Platform

## Overview

FightIQ is an AI-powered fighter analysis platform designed to provide comprehensive performance insights and training recommendations for combat sports athletes. The application analyzes fighter statistics, performance data, and fighting styles to generate actionable insights for coaches and fighters. It features real-time performance tracking, AI-generated recommendations, and detailed analytics dashboards.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React with TypeScript and follows a component-based architecture. Key architectural decisions include:

- **React Router Alternative**: Uses `wouter` for lightweight client-side routing instead of React Router for reduced bundle size
- **State Management**: Leverages TanStack Query for server state management, avoiding the need for additional state management libraries like Redux
- **UI Framework**: Implements shadcn/ui components built on Radix UI primitives for accessible and customizable components
- **Styling**: Uses Tailwind CSS with CSS variables for theming and consistent design system
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
The backend follows a RESTful API design pattern with Express.js:

- **Framework**: Express.js with TypeScript for type safety
- **API Design**: RESTful endpoints for CRUD operations on fighters, analyses, training sessions, and performance data
- **Error Handling**: Centralized error handling middleware for consistent error responses
- **Development Integration**: Vite middleware integration for seamless full-stack development

### Data Storage Solutions
The application is designed to work with PostgreSQL through Drizzle ORM:

- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **Database**: PostgreSQL with Neon Database integration for serverless deployment
- **Schema**: Strongly typed database schema with foreign key relationships between fighters, analyses, training sessions, and performance data
- **Migrations**: Drizzle Kit for database migrations and schema updates
- **Development Fallback**: In-memory storage implementation for development and testing scenarios

### Authentication and Authorization
Currently implements a basic session-based approach:

- **Session Management**: Uses connect-pg-simple for PostgreSQL session storage
- **Development Mode**: Basic session handling without complex authentication flows

### External Service Integrations
The platform is designed to integrate with various external services:

- **AI/ML Models**: Mock AI analysis functions that can be replaced with actual machine learning model integrations
- **Database Services**: Neon Database for serverless PostgreSQL hosting
- **Chart Libraries**: Recharts for data visualization and performance analytics
- **Development Tools**: Replit integration for development environment optimization

### Key Design Patterns
- **Separation of Concerns**: Clear separation between frontend components, backend routes, and data storage layers
- **Type Safety**: End-to-end TypeScript implementation with shared schema definitions
- **Component Composition**: Reusable UI components following the compound component pattern
- **API Client**: Centralized API request handling with automatic error management
- **Query Invalidation**: Strategic cache invalidation for real-time data updates

## External Dependencies

### Database & ORM
- **PostgreSQL**: Primary database for production deployment
- **Drizzle ORM**: Type-safe ORM for database operations and schema management
- **Neon Database**: Serverless PostgreSQL hosting service
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Frontend Libraries
- **React 18**: Core frontend framework with TypeScript support
- **TanStack Query**: Server state management and caching
- **wouter**: Lightweight React router alternative
- **Radix UI**: Headless component library for accessibility
- **shadcn/ui**: Pre-built component system based on Radix UI
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Chart library for data visualization
- **React Hook Form**: Form state management with validation

### Backend Framework
- **Express.js**: Web application framework for Node.js
- **Zod**: Schema validation library for runtime type checking
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment optimizations and debugging tools

### UI & Styling
- **Lucide React**: Icon library
- **class-variance-authority**: Utility for managing component variants
- **clsx & tailwind-merge**: Class name management utilities
- **date-fns**: Date manipulation library
- **embla-carousel**: Carousel component library