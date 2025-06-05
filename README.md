# Authentication App

A modern authentication application built with Next.js, TypeScript, and Tailwind CSS featuring login, registration, and user management capabilities.

## 🚀 Features

- **User Authentication**: Login and registration functionality
- **Form Validation**: Client-side validation for email, password, and name fields
- **State Management**: Zustand-based stores for auth and form state
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Remember Me**: Persistent login sessions
- **Google OAuth Ready**: Prepared for Google authentication integration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16.8 or later)
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Git** for version control

## 🛠️ Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sniren210/auth-zero-one.git
cd zero-one-project
```

### 2. Install Dependencies

Choose your preferred package manager:

```bash
npm install
```

```bash
yarn install
```

```bash
pnpm install
```

```bash
bun install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Add your environment variables:

```env
# This is an example of a .env file for a Next.js application.
NODE_ENV=production
PORT=3000

# Authentication
NEXTAUTH_URL=https://zero-one-project-gules.vercel.app/

# Database (if applicable)
DATABASE_URL=your-database-url

# Google OAuth (when implemented)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. Start Development Server

```bash
npm run dev
```

```bash
yarn dev
```

```bash
pnpm dev
```

```bash
bun dev
```

The application will be available at [https://zero-one-project-gules.vercel.app/](https://zero-one-project-gules.vercel.app/)

## 🏗️ Project Structure

```
src/                   # Source code
│   ├── components/        # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── interface/        # TypeScript interfaces and types
│   ├── pages/            # Next.js pages (Pages Router)
│   │   ├── api/          # API routes
│   │   ├── _app.tsx      # App component wrapper
│   │   ├── _document.tsx # Document component
│   │   └── index.tsx     # Main login/register page
│   ├── store/            # State management
│   ├── styles/           # Global styles and CSS modules
│   ├── utils/            # Utility functions and helpers
```

## 🧪 Testing

### Setting Up Tests

First, install testing dependencies:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

### Running Tests

```bash
npm run test
```

```bash
npm run test:watch
```

```bash
npm run test:coverage
```

### Testing Guidelines

- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test component interactions and API calls
- **E2E Tests**: Test complete user workflows

### Test Structure

```
src/
└── __tests__/          # Test files
    ├── ButtonComponent.test.tsx
    ├── index.test.tsx
    ├── InputComponent.test.tsx
    ├── useAuthStore.test.ts
    └── useFormStore.test.ts

cypress/
├── component/           # Component testing
├── downloads/          # Downloaded files
├── e2e/                # End-to-end tests
└── support/            # Support files

test/
├── integration/        # Integration tests
└── setup/             # Test setup files
```

### Example Test Files

```typescript:__tests__/pages/index.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from '@/pages/index'

// Mock the stores
jest.mock('@/stores/authStore')
jest.mock('@/stores/formStore')

describe('LoginPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks()
  })

  it('renders login form by default', () => {
    render(<LoginPage />)

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('switches to register mode when toggle is clicked', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)

    const toggleButton = screen.getByText(/create account/i)
    await user.click(toggleButton)

    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
  })

  it('validates email format', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)

    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'invalid-email')

    const submitButton = screen.getByRole('button', { name: /sign in/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument()
    })
  })
})
```

```typescript:__tests__/stores/authStore.test.ts
import { renderHook, act } from '@testing-library/react'
import { useAuthStore } from '@/stores/authStore'

describe('AuthStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAuthStore.getState().logout()
  })

  it('initializes with default state', () => {
    const { result } = renderHook(() => useAuthStore())

    expect(result.current.user).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.rememberMe).toBe(false)
  })

  it('handles login successfully', async () => {
    const { result } = renderHook(() => useAuthStore())

    await act(async () => {
      await result.current.login('test@example.com', 'password123')
    })

    expect(result.current.user).toBeTruthy()
    expect(result.current.error).toBeNull()
  })

  it('handles login failure', async () => {
    const { result } = renderHook(() => useAuthStore())

    await act(async () => {
      await result.current.login('invalid@example.com', 'wrongpassword')
    })

    expect(result.current.user).toBeNull()
    expect(result.current.error).toBeTruthy()
  })
})
```

## 🔧 Available Scripts

| Script            | Description                   |
| ----------------- | ----------------------------- |
| `dev`             | Start development server      |
| `build`           | Build production application  |
| `start`           | Start production server       |
| `lint`            | Run ESLint for code quality   |
| `test`            | Run Jest test suite           |
| `test:watch`      | Run tests in watch mode       |
| `test:coverage`   | Generate test coverage report |
| `test:unit`       | Run unit tests only           |
| `test:ci`         | Run tests in CI environment   |
| `cypress:open`    | Open Cypress test runner      |
| `cypress:run`     | Run Cypress tests             |
| `test:e2e`        | Run end-to-end tests          |
| `test:e2e:headed` | Run E2E tests in headed mode  |
| `type-check`      | Run TypeScript type checking  |
| `vercel-build`    | Build for Vercel deployment   |

## 📦 Building for Production

### 1. Build the Application

```bash
npm run build
```

### 2. Test Production Build Locally

```bash
npm run start
```

### 3. Optimize and Analyze

```bash
npm run analyze
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub/GitLab repository to Vercel
2. **Configure Environment Variables**: Add your `.env.local` variables to Vercel dashboard
3. **Deploy**: Automatic deployment on every push to main branch

```bash
npm i -g vercel
vercel --prod
```

### Docker Deployment

1. **Build Docker Image**:

```bash
docker build -t auth-app .
```

2. **Run Container**:

```bash
docker run -p 3000:3000 auth-app
```

### Manual Server Deployment

1. **Build Application**:

```bash
npm run build
```

2. **Copy Files**: Upload `.next`, `public`, `package.json`, and `package-lock.json`

3. **Install Dependencies**:

```bash
npm ci --only=production
```

4. **Start Application**:

```bash
npm start
```

## 🔒 Security Considerations

- **Environment Variables**: Never commit sensitive data to version control
- **HTTPS**: Always use HTTPS in production
- **CORS**: Configure proper CORS policies
- **Rate Limiting**: Implement rate limiting for authentication endpoints
- **Input Validation**: Validate all user inputs on both client and server
- **Password Security**: Use proper password hashing (bcrypt, argon2)

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**:

   ```bash
   lsof -ti:3000 | xargs kill -9
   ```

2. **Node Modules Issues**:

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript Errors**:

   ```bash
   npm run type-check
   ```

4. **Build Failures**:
   ```bash
   npm run lint:fix
   npm run build
   ```

## 📚 Development Guidelines

### Code Style

- Use **TypeScript** for all new files
- Follow **ESLint** and **Prettier** configurations
- Use **functional components** with hooks
- Implement **proper error handling**
- Write **meaningful commit messages**

### State Management

- Use **Zustand** for global state
- Keep **local state** for component-specific data
- Implement **proper error states**
- Handle **loading states** appropriately

### API Guidelines

- Use **proper HTTP status codes**
- Implement **error handling middleware**
- Add **request validation**
- Use **consistent response formats**

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue on GitHub for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Testing Library Documentation](https://testing-library.com/docs/)

---

**Happy Coding! 🎉**
