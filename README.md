# Portfolio Website

A modern, interactive portfolio website showcasing full-stack development projects, engineering visualizations, and professional experience. Built with React, TypeScript, and cutting-edge web technologies.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success) ![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript) ![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?logo=vite)

---

## Features

### **Interactive Design**
- **Animated Hero Section** with particle effects and custom cursor interactions
- **Holographic card effects** with smooth hover animations
- **Responsive design** optimized for all devices
- **Dark theme** with gradient accents and modern UI components

### **Engineering Visualizations**
- **Dijkstra's Algorithm Visualizer** - Interactive graph pathfinding demonstration
- **Neural Network Playground** - Real-time ML visualization with customizable data points
- **Sorting Algorithm Visualizer** - Side-by-side comparison of Bubble Sort and Merge Sort

### **Professional Sections**
- **Project Showcase** - Featured projects with detailed case studies
- **Experience Timeline** - Interactive career progression display
- **About Section** - Skills, achievements, and professional background
- **Contact Form** - Integrated contact system with Supabase backend

### **Backend Integration**
- **Supabase Authentication** - Secure user authentication system
- **Database Management** - Projects and case studies stored in Supabase
- **Email Integration** - Contact form email notifications via Supabase Edge Functions

---

## Tech Stack

### **Frontend**
- **React 18.3.1** - UI library
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.1** - Fast build tool and dev server
- **React Router 6.26.2** - Client-side routing
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives

### **Backend & Services**
- **Supabase** - Backend-as-a-Service (Database, Auth, Edge Functions)
- **React Query** - Server state management
- **React Hook Form** - Form handling with validation

### **Key Libraries**
- **Lucide React** - Icon library
- **Recharts** - Data visualization
- **Sonner** - Toast notifications
- **Zod** - Schema validation
- **date-fns** - Date utilities

---

## Getting Started

### **Prerequisites**
- Node.js 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- npm or yarn package manager
- Supabase account (for backend features)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

---

## Project Structure

```
Portfolio/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── hero/           # Hero section components
│   │   ├── projects/       # Project-related components
│   │   ├── experience/     # Experience section components
│   │   └── contact/        # Contact form components
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Home page
│   │   ├── Projects.tsx    # Projects listing
│   │   ├── Engineering.tsx # Engineering visualizations
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── integrations/       # External service integrations
│       └── supabase/       # Supabase client setup
├── supabase/               # Supabase configuration
│   ├── migrations/         # Database migrations
│   └── functions/          # Edge functions
├── public/                 # Static assets
└── dist/                   # Build output
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## Key Features Explained

### **Interactive Hero Section**
- Custom cursor effects that respond to mouse movement
- Particle background animations
- 3D transform effects on hover
- Smooth scroll indicators

### **Engineering Visualizations**
- **Dijkstra's Algorithm**: Create custom graphs, set start/end nodes, and visualize shortest path finding
- **Neural Network Playground**: Add training data, adjust network parameters, and watch real-time learning
- **Sorting Visualizer**: Compare algorithms with step-by-step execution and performance metrics

### **Project Management**
- Admin authentication for content management
- Dynamic project and case study creation
- Image uploads and media management
- Responsive project cards with hover effects

---

## Configuration

### **Tailwind CSS**
Custom color palette defined in `tailwind.config.ts`:
- `portfolio-primary` - Main background color
- `portfolio-secondary` - Accent colors
- `portfolio-tertiary` - Highlight colors

### **Supabase Setup**
1. Create a new Supabase project
2. Run migrations from `supabase/migrations/`
3. Configure Edge Functions for email notifications
4. Set up Row Level Security (RLS) policies

---

## Responsive Design

The portfolio is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Laptops (1024px+)
- Desktops (1280px+)
- Large screens (1920px+)

---

## Deployment

### **Build for Production**
```bash
npm run build
```

The `dist/` folder will contain the production-ready files.

### **Deployment Options**
- **Vercel** - Recommended for Vite projects
- **Netlify** - Easy deployment with continuous integration
- **GitHub Pages** - Free hosting for static sites
- **Supabase Hosting** - Integrated with your Supabase project

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is private and proprietary. All rights reserved.

---

## Author

**Your Name**
- Portfolio: [Your Portfolio URL]
- Email: winghar@outlook.com
- LinkedIn: [Your LinkedIn]

---

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Lucide](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

## Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/portfolio?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/portfolio?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/portfolio)
![GitHub license](https://img.shields.io/github/license/yourusername/portfolio)

---

<div align="center">

**Built with React, TypeScript, and modern web technologies**

Star this repo if you find it helpful!

</div>
