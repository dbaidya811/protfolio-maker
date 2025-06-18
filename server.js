const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory storage for portfolios (in production, use a database)
const portfolios = new Map();

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create portfolio
app.post('/api/portfolio', (req, res) => {
    try {
        const portfolioData = req.body;
        const portfolioId = uuidv4();
        
        // Generate portfolio HTML
        const portfolioHTML = generatePortfolioHTML(portfolioData);
        
        // Store portfolio data
        portfolios.set(portfolioId, {
            id: portfolioId,
            data: portfolioData,
            html: portfolioHTML,
            createdAt: new Date().toISOString()
        });
        
        res.json({
            success: true,
            portfolioId: portfolioId,
            shareUrl: `http://localhost:${PORT}/portfolio/${portfolioId}`
        });
    } catch (error) {
        console.error('Error creating portfolio:', error);
        res.status(500).json({ success: false, error: 'Failed to create portfolio' });
    }
});

// Get portfolio by ID
app.get('/portfolio/:id', (req, res) => {
    const portfolioId = req.params.id;
    const portfolio = portfolios.get(portfolioId);
    
    if (!portfolio) {
        return res.status(404).send('Portfolio not found');
    }
    
    res.send(portfolio.html);
});

// Get portfolio data by ID (for editing)
app.get('/api/portfolio/:id', (req, res) => {
    const portfolioId = req.params.id;
    const portfolio = portfolios.get(portfolioId);
    
    if (!portfolio) {
        return res.status(404).json({ success: false, error: 'Portfolio not found' });
    }
    
    res.json({ success: true, data: portfolio.data });
});

// Update portfolio
app.put('/api/portfolio/:id', (req, res) => {
    try {
        const portfolioId = req.params.id;
        const portfolio = portfolios.get(portfolioId);
        
        if (!portfolio) {
            return res.status(404).json({ success: false, error: 'Portfolio not found' });
        }
        
        const updatedData = req.body;
        const updatedHTML = generatePortfolioHTML(updatedData);
        
        portfolios.set(portfolioId, {
            ...portfolio,
            data: updatedData,
            html: updatedHTML,
            updatedAt: new Date().toISOString()
        });
        
        res.json({ success: true, message: 'Portfolio updated successfully' });
    } catch (error) {
        console.error('Error updating portfolio:', error);
        res.status(500).json({ success: false, error: 'Failed to update portfolio' });
    }
});

// Generate portfolio HTML
function generatePortfolioHTML(data) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name || 'Portfolio'} - Portfolio</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #e0e0e0;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
            min-height: 100vh;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .portfolio {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border-radius: 25px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            margin: 20px 0;
            animation: fadeInUp 1s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .header {
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 50%, rgba(240, 147, 251, 0.9) 100%), 
                        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%);
            background-size: cover, 100% 100%, 100% 100%, 100% 100%;
            background-position: center, center, center, center;
            background-attachment: fixed, fixed, fixed, fixed;
            background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
            color: white;
            padding: 80px 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            z-index: 0;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .header.no-image::after {
            opacity: 1;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(15, 15, 35, 0.7) 0%, rgba(26, 26, 46, 0.6) 50%, rgba(22, 33, 62, 0.7) 100%);
            z-index: 1;
        }
        
        .header-content {
            position: relative;
            z-index: 2;
        }
        
        .profile-img {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            border: 5px solid rgba(255, 255, 255, 0.4);
            margin: 0 auto 30px;
            display: block;
            object-fit: cover;
            background: #2a2a3e;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 0 30px rgba(102, 126, 234, 0.3);
            transition: all 0.3s ease;
            animation: float 6s ease-in-out infinite;
        }
        
        .profile-img:hover {
            transform: scale(1.05) rotate(5deg);
            border-color: rgba(255, 255, 255, 0.8);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 40px rgba(102, 126, 234, 0.5);
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .name {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 15px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            animation: slideInDown 1s ease-out 0.3s both;
        }
        
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .title {
            font-size: 1.4rem;
            opacity: 0.9;
            margin-bottom: 30px;
            animation: slideInDown 1s ease-out 0.5s both;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 25px;
            flex-wrap: wrap;
            animation: slideInDown 1s ease-out 0.7s both;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(255, 255, 255, 0.1);
            padding: 12px 20px;
            border-radius: 25px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
            cursor: pointer;
            text-decoration: none;
            color: white;
            position: relative;
            overflow: hidden;
            font-weight: 500;
        }
        
        .contact-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
        }
        
        .contact-item:hover::before {
            left: 100%;
        }
        
        .contact-item:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        
        .contact-item.phone:hover {
            background: linear-gradient(135deg, #28a745, #20c997);
            box-shadow: 0 10px 25px rgba(40, 167, 69, 0.3);
            border-color: #28a745;
        }
        
        .contact-item.email:hover {
            background: linear-gradient(135deg, #007bff, #0056b3);
            box-shadow: 0 10px 25px rgba(0, 123, 255, 0.3);
            border-color: #007bff;
        }
        
        .contact-item.location:hover {
            background: linear-gradient(135deg, #dc3545, #c82333);
            box-shadow: 0 10px 25px rgba(220, 53, 69, 0.3);
            border-color: #dc3545;
        }
        
        .contact-item i {
            font-size: 1.1rem;
            transition: transform 0.3s ease;
        }
        
        .contact-item:hover i {
            transform: scale(1.2);
        }
        
        .section {
            padding: 50px 40px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            position: relative;
        }
        
        .section:last-child {
            border-bottom: none;
        }
        
        .section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), transparent);
        }
        
        .section-title {
            font-size: 2.2rem;
            color: #667eea;
            margin-bottom: 30px;
            border-bottom: 3px solid #667eea;
            padding-bottom: 15px;
            position: relative;
            display: inline-block;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 50px;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #f093fb);
            animation: expandWidth 2s ease-out;
        }
        
        @keyframes expandWidth {
            from { width: 0; }
            to { width: 50px; }
        }
        
        .about-text {
            font-size: 1.2rem;
            line-height: 1.8;
            color: #b0b0b0;
            text-align: justify;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
            margin-top: 30px;
        }
        
        .skill-item {
            background: rgba(255, 255, 255, 0.05);
            padding: 25px;
            border-radius: 15px;
            border-left: 4px solid #667eea;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .skill-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
            transition: left 0.5s ease;
        }
        
        .skill-item:hover::before {
            left: 100%;
        }
        
        .skill-item:hover {
            transform: translateY(-5px) scale(1.02);
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }
        
        .skill-name {
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 8px;
            font-size: 1.1rem;
        }
        
        .skill-level {
            color: #667eea;
            font-size: 0.95rem;
            font-weight: 500;
        }
        
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-top: 30px;
        }
        
        .project-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            padding: 30px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
        }
        
        .project-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #f093fb);
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }
        
        .project-card:hover::before {
            transform: scaleX(1);
        }
        
        .project-card:hover {
            transform: translateY(-10px) scale(1.02);
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .project-title {
            font-size: 1.4rem;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 15px;
        }
        
        .project-description {
            color: #b0b0b0;
            margin-bottom: 20px;
            line-height: 1.7;
        }
        
        .project-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .tech-tag {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 6px 15px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .tech-tag:hover {
            transform: scale(1.1);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }
        
        .experience-item {
            margin-bottom: 40px;
            padding-left: 30px;
            border-left: 3px solid #667eea;
            position: relative;
            transition: all 0.3s ease;
        }
        
        .experience-item::before {
            content: '';
            position: absolute;
            left: -8px;
            top: 0;
            width: 13px;
            height: 13px;
            background: #667eea;
            border-radius: 50%;
            border: 3px solid #1a1a2e;
        }
        
        .experience-item:hover {
            transform: translateX(10px);
        }
        
        .experience-title {
            font-size: 1.3rem;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 8px;
        }
        
        .experience-company {
            color: #667eea;
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 1.1rem;
        }
        
        .experience-date {
            color: #888;
            font-size: 0.95rem;
            margin-bottom: 12px;
            font-style: italic;
        }
        
        .experience-description {
            color: #b0b0b0;
            line-height: 1.7;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 25px;
            margin-top: 30px;
        }
        
        .social-link {
            display: inline-block;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border-radius: 50%;
            text-align: center;
            line-height: 60px;
            text-decoration: none;
            transition: all 0.3s ease;
            font-size: 1.2rem;
            position: relative;
            overflow: hidden;
        }
        
        .social-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
        }
        
        .social-link:hover::before {
            left: 100%;
        }
        
        .social-link:hover {
            transform: translateY(-5px) scale(1.1);
            box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
        }
        
        .buy-coffee-btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: linear-gradient(135deg, #FF6B6B, #FF8E53);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
            margin-top: 20px;
            border: none;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
        }
        
        .buy-coffee-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
        }
        
        .buy-coffee-btn:hover::before {
            left: 100%;
        }
        
        .buy-coffee-btn:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 15px 35px rgba(255, 107, 107, 0.4);
            background: linear-gradient(135deg, #FF5252, #FF7043);
        }
        
        .buy-coffee-btn:active {
            transform: translateY(-1px) scale(1.02);
        }
        
        .coffee-icon {
            font-size: 1.2rem;
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: #1a1a2e;
        }
        
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #5a6fd8, #6a4c93);
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }
            
            .header {
                padding: 60px 20px;
            }
            
            .name {
                font-size: 2.2rem;
            }
            
            .section {
                padding: 40px 20px;
            }
            
            .contact-info {
                flex-direction: column;
                gap: 15px;
            }
            
            .skills-grid {
                grid-template-columns: 1fr;
            }
            
            .projects-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="portfolio">
            <div class="header" id="portfolioHeader">
                <div class="header-content">
                    <img src="${data.profileImage || 'https://via.placeholder.com/180x180?text=Profile'}" alt="Profile" class="profile-img">
                    <h1 class="name">${data.name || 'Your Name'}</h1>
                    <p class="title">${data.title || 'Professional Title'}</p>
                    <div class="contact-info">
                        ${data.phone ? `<a href="tel:${data.phone.replace(/\s+/g, '')}" class="contact-item phone" title="Click to call"><i class="fas fa-phone"></i> ${data.phone}</a>` : ''}
                        ${data.email ? `<a href="mailto:${data.email}" class="contact-item email" title="Click to send email"><i class="fas fa-envelope"></i> ${data.email}</a>` : ''}
                        ${data.location ? `<a href="https://www.google.com/maps/search/${encodeURIComponent(data.location)}" target="_blank" class="contact-item location" title="Click to view on Google Maps"><i class="fas fa-map-marker-alt"></i> ${data.location}</a>` : ''}
                    </div>
                    <a href="https://coff.ee/dbaidya811e" target="_blank" class="buy-coffee-btn">
                        <i class="fas fa-coffee coffee-icon"></i>
                        Buy Me a Coffee
                    </a>
                </div>
            </div>
            
            ${data.about ? `
            <div class="section">
                <h2 class="section-title">About Me</h2>
                <p class="about-text">${data.about}</p>
            </div>
            ` : ''}
            
            ${data.skills && data.skills.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Skills</h2>
                <div class="skills-grid">
                    ${data.skills.map(skill => `
                        <div class="skill-item">
                            <div class="skill-name">${skill.name}</div>
                            <div class="skill-level">${skill.level}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            ${data.projects && data.projects.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Projects</h2>
                <div class="projects-grid">
                    ${data.projects.map(project => `
                        <div class="project-card">
                            <h3 class="project-title">${project.title}</h3>
                            <p class="project-description">${project.description}</p>
                            ${project.technologies ? `
                                <div class="project-tech">
                                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            ${data.experience && data.experience.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Experience</h2>
                ${data.experience.map(exp => `
                    <div class="experience-item">
                        <h3 class="experience-title">${exp.title}</h3>
                        <p class="experience-company">${exp.company}</p>
                        <p class="experience-date">${exp.startDate} - ${exp.endDate || 'Present'}</p>
                        <p class="experience-description">${exp.description}</p>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${data.education && data.education.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Education</h2>
                ${data.education.map(edu => `
                    <div class="experience-item">
                        <h3 class="experience-title">${edu.degree}</h3>
                        <p class="experience-company">${edu.institution}</p>
                        <p class="experience-date">${edu.startDate} - ${edu.endDate || 'Present'}</p>
                        <p class="experience-description">${edu.description || ''}</p>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${(data.github || data.linkedin || data.twitter || data.website) ? `
            <div class="section">
                <h2 class="section-title">Connect With Me</h2>
                <div class="social-links">
                    ${data.github ? `<a href="${data.github}" class="social-link" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                    ${data.linkedin ? `<a href="${data.linkedin}" class="social-link" target="_blank"><i class="fab fa-linkedin"></i></a>` : ''}
                    ${data.twitter ? `<a href="${data.twitter}" class="social-link" target="_blank"><i class="fab fa-twitter"></i></a>` : ''}
                    ${data.website ? `<a href="${data.website}" class="social-link" target="_blank"><i class="fas fa-globe"></i></a>` : ''}
                </div>
            </div>
            ` : ''}
        </div>
    </div>
</body>
</html>`;
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 