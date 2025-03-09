
# Escape from Eden SQL


## Project Overview

Escape from Eden is a minimalist blog platform designed to embody the spirit of rebuilding. Born from a desire to move away from the heavy administration of WordPress, this project delivers a clean, streamlined interface focused solely on publishing posts and receiving messages. The design emphasizes simplicity—with a striking hero title and immediate access to recent posts—to clearly communicate the author’s personal journey of change and growth.

On the backend, the platform leverages PostgreSQL and Prisma to handle relational data efficiently, ensuring robust search functionality and scalability. This modern stack simplifies the management of interconnected content while retaining the flexibility to integrate real-time features (via Firebase, for example) if needed. Overall, Escape from Eden represents both a design and technical evolution towards a more focused, efficient blogging experience.


## Tech Stack

- Frontend: Next.js, React, TailwindCSS
- Backend: Node.js, Prisma, PostgreSQL
- Integrations: Stripe, Cloudinary, Supabase, Nodemailer, reCAPTCHA


## Getting Started


### Prerequisites

- Node.js (version X.X.X or above)
- Your preferred package manager: npm, yarn, pnpm, or bun


### Installation

1. Clone the repository:
  
  ```bash
  git clone https://github.com/your-repo/escape-from-eden-sql.git
  cd escape-from-eden-sql
```

2. Install dependencies:
 
  ```bash
 npm install
```

3. Configure Environment Variables:
   Create a .env file in the root directory and fill in the required keys (see the Environment Variables section below).

### Running the Development Server

Start the development server:
   ```
   npm run dev
```
   or
   ```
   yarn dev
```
  or
   ```
   pnpm dev
```
  or
  ```
   bun dev
```
Open http://localhost:3000 in your browser to view the application. Editing files (e.g., app/page.tsx) will trigger automatic updates.


## Environment Variables

Below is an explanation of the required environment variables. Replace placeholder values with your actual configuration:


Variable                              | Description
------------------------------------- | --------------------------------------------------------
DATABASE_URL                          | Postgres connection string.
NEXTAUTH_URL                          | URL for NextAuth authentication.
NEXTAUTH_SECRET                       | Secret for NextAuth sessions.
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME     | Cloudinary cloud name for image uploads.
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET  | Cloudinary preset configuration.
NEXT_PUBLIC_RECAPTCHA_SITE_KEY         | Google reCAPTCHA site key.
RECAPTCHA_SECRET_KEY                   | Google reCAPTCHA secret key.
SUPABASE_URL                          | Supabase URL for database integration.
SUPABASE_ANON_KEY                     | Supabase anonymous key.
SMTP_HOST                             | SMTP host for sending emails.
SMTP_PORT                             | SMTP port for sending emails.
SMTP_USER                             | SMTP username for email service.
SMTP_PASS                             | SMTP password for email service.
STRIPE_SECRET_KEY                     | Stripe secret key for processing payments.
STRIPE_PUBLISHABLE_KEY                | Stripe publishable key for client-side operations.
NEXT_PUBLIC_BASE_URL                  | Base URL for the application.
STRIPE_BACKUP_CODE                    | Backup code for Stripe (if applicable).


## Available Scripts

- npm run dev: Runs the development server.
- npm run build: Builds the project for production.
- npm run start: Starts the production server.
- npm run lint: Runs ESLint to analyze code quality.
- npm run seed: Seeds the database using Prisma.
- npm run vercel-build: Generates Prisma artifacts and builds the project for Vercel deployment.


## Project Structure

A high-level overview of the project’s directory structure:
(app directory)    - Next.js application files (pages, components, etc.)
(prisma directory) - Prisma schema and migration files
(public directory)  - Static assets (images, fonts, etc.)
... (continue as needed)


## Deployment


### Deploying on Vercel

1. Connect your repository to Vercel.
2. Set environment variables in Vercel’s dashboard as per the .env file.
3. Deploy your project.

For more details, refer to the Next.js deployment documentation at: https://nextjs.org/docs/app/building-your-application/deploying


## Testing & Quality Assurance

- Testing: Include instructions on how to run tests if they are set up.
- Linting & Formatting: Use npm run lint to check for code quality and adhere to the project’s formatting guidelines.


## Contribution Guidelines

- Contributing: Please refer to CONTRIBUTING.md for detailed guidelines on contributing to the project.
- Branching & PRs: Follow the established branch management and pull request process.
- Code of Conduct: Ensure you adhere to the project’s code of conduct.


## License

This project is licensed under the MIT License. See the LICENSE file for details.


## Contact

For support or inquiries, please open an issue in the repository or contact joelborofskydev@gmail.com.


## Additional Resources

- Next.js Documentation – Learn about Next.js features and APIs: https://nextjs.org/docs
- Learn Next.js – An interactive tutorial for Next.js: https://nextjs.org/learn
- Next.js GitHub Repository – Your feedback and contributions are welcome: https://github.com/vercel/next.js
