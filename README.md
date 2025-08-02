# Simplifai 🚀

**AI-Powered Learning Platform**  
Transform your documents into flashcards, summaries, and quizzes with cutting-edge AI.

[![License](https://img.shields.io/github/license/Er-luffy-D/Simplifai?style=flat-square)](LICENSE)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-blue?style=flat-square)](https://simplif-ai-xi.vercel.app/)
[![GitHub Repo stars](https://img.shields.io/github/stars/Er-luffy-D/Simplifai?style=social)](https://github.com/Er-luffy-D/Simplifai/stargazers)

---

## ✨ What is Simplifai?

Simplifai is an open-source, AI-powered platform that revolutionizes learning by turning your documents (PDF, TXT) into concise summaries, interactive flashcards, and quizzes—instantly.

- **Upload** any document
- **Get** AI-generated summaries, key points, flashcards, and quizzes
- **Accelerate** your learning with tailored, effective study materials

Whether you’re a student, teacher, or lifelong learner, Simplifai makes learning easier, faster, and more enjoyable.

---

## 🌟 Features

- **Smart Flashcards**: Instantly generate flashcards from your document content
- **Concise Summaries**: Get the main points and key insights without reading the whole document
- **Interactive Quizzes**: Test your understanding with AI-generated quizzes and explanations
- **PDF & TXT Support**: Upload and process PDF or TXT files (additional formats coming soon)
- **Secure & Private**: Your files are processed securely and never stored permanently

---

## 🖼️ Screenshots
  
![image](https://github.com/user-attachments/assets/0d19e247-b3e2-4720-87ed-5172164a2d65)
<br><br>
![image](https://github.com/user-attachments/assets/06b08719-a6c8-4cd1-9b93-755fe6de6d11)
<br><br>
<p>Demo video </p>
https://github.com/user-attachments/assets/8db3f7ca-6e1d-4e01-bc5c-d844c77baaa6

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Er-luffy-D/Simplifai.git
cd Simplifai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and fill in the required secrets:

```env
# 🔐 AI Configuration
AI_API_KEY="your_openrouter_or_deepseek_api_key"
NEXT_PUBLIC_AI_URL="https://openrouter.ai/api/v1/chat/completions"
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"

# 🔐 Auth Configuration
AUTH_SECRET="your_random_auth_secret"
GOOGLE_CLIENT_ID="your_google_oauth_client_id"
GOOGLE_CLIENT_SECRET="your_google_oauth_client_secret"

# 🗄️ Database

DATABASE_URL="postgresql://username:password@host:port/dbname" 
DIRECT_URL="postgresql://username:password@host:port/dbname"    

# 🔑 Other Secrets (omnidim chatbot)
NEXT_PUBLIC_OMNIDIM_SECRET_KEY="your_public_secret_key"
```

### 4. Run Prisma migrations

```bash
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the app!

---

## 🤖 How It Works

- **Frontend**: Next.js 14, React, Tailwind CSS, Redux Toolkit
- **Auth**: NextAuth.js (Credentials & Google)
- **AI Backend**: DeepSeek/OpenRouter API for document parsing and generation
- **Database**: PostgreSQL with Prisma ORM

---

## 💡 Why Simplifai?

- **Personalized Learning**: Adapts to your pace and style
- **Universal Access**: Free tier for students, advanced features for pros
- **Open Source**: Contributions welcome!

---

## 🛠️ Roadmap

- [x] PDF & TXT parsing
- [x] AI-generated summaries, flashcards, quizzes
- [x] User authentication (NextAuth)
- [ ] Retrieval-Augmented Generation (RAG) chat with documents
- [ ] More file format support (DOCX, RTF)
- [ ] Team/Enterprise features
- [ ] Mobile-friendly design improvements

---

## 🤝 Contributing

Want to help? PRs are welcome!  
Please see [CONTRIBUTING.md](CONTRIBUTING.md) (or open an issue to discuss your ideas).

---

## 🧑‍💻 Author

- **Piyush Dixit** — [@piyushdixitizme](https://linkedin.com/in/piyushdixitizme) | [GitHub](https://github.com/Er-luffy-D)

---


## 🐳 Run Locally with Docker

### 1. Clone the Repository

```bash
git clone https://github.com/Gargibajpai/SimplifAI.git
cd SimplifAI

## Set Up Environment Variables 
cp .env.example .env.local
Then edit the .env.local file and provide the required values:

AI_API_KEY

NEXT_PUBLIC_AI_URL

NEXT_PUBLIC_BACKEND_URL

AUTH_SECRET

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

DATABASE_URL

DIRECT_URL

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

These keys are essential for running the application locally.

## Make Sure Docker Is Installed 
Install Docker Desktop if it’s not already installed:

Windows/macOS: https://www.docker.com/products/docker-desktop

Ubuntu/Linux: Follow official instructions on https://docs.docker.com/get-docker/

Check Docker and Docker Compose versions:

docker --version
docker compose version

## Run the App with Docker Compose
 docker compose up --build

This will:

Build the image

Start the app on http://localhost:3000
## Stop the App

docker compose down


## 📄 License

MIT License. See [LICENSE](LICENSE).

---

## ⭐️ Star this repo if you like it!

_Accelerate your learning. Empower your future. — Simplifai Team_
