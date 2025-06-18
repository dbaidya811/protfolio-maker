# Portfolio Generator 🚀

A modern, responsive web platform that allows anyone to create beautiful professional portfolios with a shareable link. Built with Node.js, Express, and modern CSS.

![Portfolio Generator](https://cdn-icons-png.flaticon.com/512/15181/15181334.png)

## ✨ Features

### 🎨 Modern Design
- **Dark Theme**: Beautiful dark gradient background with modern aesthetics
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Professional Layout**: Clean and organized sections for all portfolio content

### 📝 Comprehensive Portfolio Sections
- **Basic Information**: Name, title, contact details, profile image
- **About Me**: Personal description and background
- **Skills**: Add multiple skills with proficiency levels
- **Projects**: Showcase your work with descriptions and technologies
- **Work Experience**: Professional experience with company details
- **Education**: Academic background and qualifications
- **Social Links**: GitHub, LinkedIn, Twitter, and personal website

### 🔗 Shareable Links
- **Unique URLs**: Each portfolio gets a unique shareable link
- **Instant Access**: No registration required to view portfolios
- **Professional URLs**: Clean, professional-looking links

### 🎯 Interactive Features
- **Clickable Contact Info**: Phone numbers open call dialer, emails open mail client, locations open Google Maps
- **Dynamic Forms**: Add/remove sections dynamically
- **Real-time Preview**: See your portfolio as you build it
- **Copy Link**: Easy one-click link copying

### ☕ Support Creator
- **Buy Me a Coffee**: Support the creator with a beautiful coffee button
- **Multiple Locations**: Coffee button appears on both the generator and generated portfolios

## 🛠️ Technology Stack

- **Backend**: Node.js with Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Modern CSS with gradients, animations, and responsive design
- **Icons**: Font Awesome for beautiful icons
- **Data Storage**: In-memory storage (can be extended to database)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or Download the Project**
   ```bash
   git clone <repository-url>
   cd portfolio-generator
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Server**
   ```bash
   npm start
   ```

4. **Access the Application**
   - Open your browser and go to `http://localhost:3000`
   - Start creating your portfolio!

## 📖 How to Use

### Creating a Portfolio

1. **Fill Basic Information**
   - Enter your full name and professional title
   - Add contact information (email, phone, location)
   - Optionally add a profile image URL

2. **Add About Me**
   - Write a compelling description about yourself
   - Share your passion, goals, and what drives you

3. **List Your Skills**
   - Add multiple skills with proficiency levels
   - Choose from Beginner, Intermediate, Advanced, or Expert

4. **Showcase Projects** (Optional)
   - Add project titles and descriptions
   - List technologies used (comma-separated)
   - Add as many projects as you want

5. **Add Work Experience** (Optional)
   - Include job titles, companies, and dates
   - Describe your roles and achievements
   - Add multiple work experiences

6. **Include Education**
   - Add degrees, institutions, and dates
   - Include additional descriptions if needed

7. **Connect Social Links**
   - Add GitHub, LinkedIn, Twitter profiles
   - Include your personal website

8. **Generate Portfolio**
   - Click "Generate Portfolio" to create your portfolio
   - Get your unique shareable link
   - Preview your portfolio instantly

### Sharing Your Portfolio

- **Copy the Link**: Use the copy button to get your portfolio URL
- **Share Anywhere**: Send the link via email, social media, or messaging apps
- **No Registration**: Anyone can view your portfolio without signing up

## 🎨 Customization

### Styling
The portfolio uses modern CSS with:
- Dark gradient backgrounds
- Glassmorphism effects
- Smooth animations and transitions
- Responsive grid layouts
- Professional typography

### Adding Features
You can easily extend the application by:
- Adding new portfolio sections
- Implementing database storage
- Adding user authentication
- Creating portfolio templates
- Adding analytics tracking

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full-featured experience with all animations
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly interface with simplified navigation

## 🔧 API Endpoints

### Create Portfolio
```
POST /api/portfolio
Content-Type: application/json

{
  "name": "John Doe",
  "title": "Full Stack Developer",
  "email": "john@example.com",
  "phone": "+1234567890",
  "location": "New York, NY",
  "about": "Passionate developer...",
  "skills": [
    {
      "name": "JavaScript",
      "level": "Advanced"
    }
  ],
  "projects": [
    {
      "title": "E-commerce Website",
      "description": "A modern e-commerce platform...",
      "technologies": ["React", "Node.js", "MongoDB"]
    }
  ],
  "experience": [
    {
      "title": "Senior Developer",
      "company": "Tech Corp",
      "startDate": "2020-01",
      "endDate": "2023-01",
      "description": "Led development team..."
    }
  ],
  "education": [
    {
      "degree": "Bachelor of Computer Science",
      "institution": "University of Technology",
      "startDate": "2016-09",
      "endDate": "2020-05",
      "description": "Focused on software engineering..."
    }
  ],
  "github": "https://github.com/johndoe",
  "linkedin": "https://linkedin.com/in/johndoe",
  "twitter": "https://twitter.com/johndoe",
  "website": "https://johndoe.com"
}
```

### View Portfolio
```
GET /portfolio/:id
```

### Update Portfolio
```
PUT /api/portfolio/:id
```

## 🎯 Features in Detail

### Interactive Contact Information
- **Phone Numbers**: Click to initiate phone calls
- **Email Addresses**: Click to open default email client
- **Locations**: Click to open Google Maps with the location

### Dynamic Form Management
- **Add/Remove Sections**: Dynamically add or remove skills, projects, experience, and education
- **Form Validation**: Required fields are validated before submission
- **Real-time Updates**: See changes as you type

### Professional Portfolio Design
- **Modern Header**: Gradient background with profile image
- **Organized Sections**: Clear separation of different portfolio parts
- **Skill Visualization**: Beautiful skill cards with hover effects
- **Project Showcase**: Professional project cards with technology tags
- **Timeline Design**: Experience and education displayed in timeline format
- **Social Integration**: Professional social media links with icons

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## ☕ Support the Creator

If you find this Portfolio Generator useful, consider supporting the creator:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://coff.ee/dbaidya811e)

## 📞 Contact

- **Creator**: [Your Name]
- **Email**: [Your Email]
- **Website**: [Your Website]
- **Buy Me a Coffee**: [coff.ee/dbaidya811e](https://coff.ee/dbaidya811e)

## 🚀 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication and account management
- [ ] Multiple portfolio templates
- [ ] Custom domain support
- [ ] Analytics and visitor tracking
- [ ] Portfolio export to PDF
- [ ] SEO optimization
- [ ] Social media sharing buttons
- [ ] Portfolio comments and feedback
- [ ] Advanced customization options

---

**Made with ❤️ by [Your Name]**

*Create beautiful portfolios in minutes!* 