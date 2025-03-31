import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get('/api/resume', (req, res) => {
    res.json({
      name: "Kamod Kumar",
      title: "Full Stack Developer",
      email: "kamod7619@gmail.com",
      phone: "+91 9598132392, +60 1112460063",
      location: "Noida, Sector-15, India"
    });
  });

  // Handle resume download
  app.get('/api/download-resume', (req, res) => {
    const resumePath = path.resolve(__dirname, '../attached_assets/Kamod_Resume_2025.pdf');
    
    if (fs.existsSync(resumePath)) {
      res.download(resumePath, 'Kamod_Kumar_Resume.pdf');
    } else {
      res.status(404).json({ message: 'Resume file not found' });
    }
  });

  // Handle contact form submissions
  app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Validate form data
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // In a real implementation, you would send an email or save to database
    // For now, just acknowledge receipt
    res.status(200).json({ 
      message: 'Message received successfully',
      data: { name, email, subject }
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
