// Sample student application data for testing
export const generateSampleApplications = () => {
  const applications = [
    {
      projectId: 'TECH2005',
      // Basic Information (Section 1)
      firstName: 'Rajesh',
      lastName: 'Kumar S',
      ieeeMembershipNo: 'IEEE2024001',
      emailId: 'rajesh.kumar@sairam.edu.in',
      phoneNo: '+91 9876543210',
      year: '3',
      department: 'CSE',
      
      // Project Information (Section 2)
      projectTitle: 'SmartWaste Tracker - AI-Powered Waste Management System',
      primarySDGGoal: 'SDG 11: Sustainable Cities and Communities',
      teamSize: '4',
      mentorName: 'Dr. Pradeep Kumar',
      mentorId: 'SAIRAM001',
      sapCode: 'SAP-SDG-001, SAP-SDG-011',
      
      // Legacy fields for compatibility
      teamName: 'EcoTech Innovators',
      teamLeader: 'Rajesh Kumar S',
      teamMembers: [
        { 
          name: 'Rajesh Kumar S', 
          rollNo: '20CS045', 
          email: 'rajesh.kumar@sairam.edu.in', 
          phone: '+91 9876543210',
          year: '3rd Year',
          department: 'Computer Science and Engineering'
        },
        { 
          name: 'Priya Sharma', 
          rollNo: '20CS046', 
          email: 'priya.sharma@sairam.edu.in', 
          phone: '+91 9876543211',
          year: '3rd Year',
          department: 'Computer Science and Engineering'
        },
        { 
          name: 'Arjun Patel', 
          rollNo: '20CS047', 
          email: 'arjun.patel@sairam.edu.in', 
          phone: '+91 9876543212',
          year: '3rd Year',
          department: 'Computer Science and Engineering'
        },
        { 
          name: 'Sneha Reddy', 
          rollNo: '20CS048', 
          email: 'sneha.reddy@sairam.edu.in', 
          phone: '+91 9876543213',
          year: '3rd Year',
          department: 'Computer Science and Engineering'
        }
      ],
      // Project Idea & Technicals (Section 3)
      problemStatement: 'Urban waste management faces challenges in efficient collection, proper segregation, and route optimization. Traditional methods lack real-time monitoring and intelligent classification capabilities, leading to inefficient resource allocation and environmental concerns.',
      projectIdeaDescription: 'Our SmartWaste Tracker integrates AI-powered image recognition with IoT sensors to create an intelligent waste management ecosystem. The system automatically classifies waste types, monitors bin fill levels, and optimizes collection routes using machine learning algorithms. This innovative solution addresses the growing need for smart city infrastructure while promoting sustainable waste management practices.',
      projectMethodology: 'The project follows a systematic approach: 1) Research and analysis of current waste management challenges, 2) Design and development of IoT sensor network, 3) Implementation of computer vision models for waste classification, 4) Development of mobile application for waste management teams, 5) Integration with cloud-based analytics platform, 6) Testing and validation in real-world scenarios.',
      technicalStack: 'Hardware: Raspberry Pi 4, Camera modules, Ultrasonic sensors, GPS modules; Software: Python, TensorFlow, React Native, Node.js, MongoDB; Cloud: AWS IoT Core, AWS Lambda, Amazon S3; ML: Convolutional Neural Networks; Mobile: React Native for cross-platform development',
      
      // Legacy compatibility fields
      projectDescription: 'An innovative IoT and AI-based solution for optimizing waste management in urban areas. The system uses computer vision to classify waste types and IoT sensors to monitor bin levels, providing real-time data for efficient waste collection routing.',
      proposedSolution: 'Our SmartWaste Tracker integrates AI-powered image recognition with IoT sensors to create an intelligent waste management ecosystem. The system automatically classifies waste types, monitors bin fill levels, and optimizes collection routes.',
      methodology: `
1. **Data Collection Phase**: Deploy IoT sensors and cameras at waste collection points
2. **AI Model Development**: Train machine learning models for waste classification using TensorFlow
3. **Mobile App Development**: Create user-friendly mobile application for waste management teams
4. **Cloud Integration**: Implement cloud-based data processing and analytics
5. **Route Optimization**: Develop algorithms for efficient waste collection routing
6. **Testing & Validation**: Conduct field tests and performance evaluation
      `,
      technicalApproach: `
- **Hardware**: Raspberry Pi 4, Camera modules, Ultrasonic sensors, GPS modules
- **Software**: Python, TensorFlow, React Native, Node.js, MongoDB
- **Cloud Services**: AWS IoT Core, AWS Lambda, Amazon S3
- **Machine Learning**: Convolutional Neural Networks for image classification
- **Mobile Development**: React Native for cross-platform compatibility
      `,
      expectedOutcome: `
- 95% accuracy in waste type classification
- 40% reduction in collection route time
- Real-time monitoring dashboard for waste management teams
- Mobile application for field workers
- Comprehensive analytics and reporting system
      `,
      // Funding & Timeline (Section 4)
      technologyReadinessLevel: '5',
      trlJustification: 'The project is at TRL 5 as we have validated the core technologies (IoT sensors, computer vision) in a relevant laboratory environment. Initial prototypes have been tested with sample waste data, demonstrating feasibility of the approach.',
      selectedSDGGoals: [11, 12, 13], // Sustainable Cities, Responsible Consumption, Climate Action
      budgetItems: [
        {
          id: 1,
          category: 'Hardware',
          components: 'Raspberry Pi 4, Camera modules, Ultrasonic sensors',
          quantity: '10 sets',
          cost: '₹35,000',
          justification: 'Essential hardware components for IoT sensor network deployment at waste collection points'
        },
        {
          id: 2,
          category: 'Software & Cloud',
          components: 'AWS services, Development tools, Licenses',
          quantity: '8 months',
          cost: '₹25,000',
          justification: 'Cloud infrastructure and software tools required for data processing and application development'
        },
        {
          id: 3,
          category: 'Testing & Deployment',
          components: 'Field testing, Installation, Miscellaneous',
          quantity: '1 project',
          cost: '₹15,000',
          justification: 'Costs associated with real-world testing, installation, and project deployment'
        }
      ],
      totalBudget: '₹75,000',
      projectStartDate: '2024-02-01',
      projectEndDate: '2024-09-30',
      keyMilestones: 'Month 1-2: Research & Design Phase\nMonth 3-4: Hardware Setup & IoT Network\nMonth 5-6: AI Model Development & Training\nMonth 7: Mobile App & Dashboard Development\nMonth 8: Integration, Testing & Deployment',
      
      // Legacy compatibility fields
      timeline: '8 months',
      milestones: [
        { phase: 'Research & Planning', duration: '1 month', deliverables: 'Project plan, literature review' },
        { phase: 'Hardware Setup', duration: '1.5 months', deliverables: 'IoT sensor deployment' },
        { phase: 'AI Model Development', duration: '2 months', deliverables: 'Trained classification model' },
        { phase: 'Software Development', duration: '2.5 months', deliverables: 'Mobile app and web dashboard' },
        { phase: 'Integration & Testing', duration: '1 month', deliverables: 'Complete system integration' }
      ],
      budget: '₹75,000',
      budgetBreakdown: {
        hardware: '₹35,000',
        software: '₹15,000',
        cloudServices: '₹10,000',
        miscellaneous: '₹15,000'
      },
      resources: 'Raspberry Pi boards, camera modules, ultrasonic sensors, cloud computing resources, mobile development tools, access to waste collection sites for testing',
      facultyMentor: 'Dr. Pradeep Kumar',
      submissionDate: '2024-01-15T10:30:00Z',
      lastModified: '2024-01-20T14:45:00Z',
      status: 'submitted',
      attachments: [
        { name: 'Project_Proposal.pdf', size: '2.5 MB' },
        { name: 'Team_Details.pdf', size: '1.2 MB' },
        { name: 'Budget_Plan.xlsx', size: '0.8 MB' }
      ]
    },
    {
      projectId: 'TECH2006',
      teamName: 'Green Energy Solutions',
      teamLeader: 'Arun Kumar M',
      teamMembers: [
        { 
          name: 'Arun Kumar M', 
          rollNo: '20EE023', 
          email: 'arun.kumar@sairam.edu.in', 
          phone: '+91 9876543220',
          year: '3rd Year',
          department: 'Electrical and Electronics Engineering'
        },
        { 
          name: 'Divya Krishnan', 
          rollNo: '20EE024', 
          email: 'divya.krishnan@sairam.edu.in', 
          phone: '+91 9876543221',
          year: '3rd Year',
          department: 'Electrical and Electronics Engineering'
        },
        { 
          name: 'Karthik Raj', 
          rollNo: '20EE025', 
          email: 'karthik.raj@sairam.edu.in', 
          phone: '+91 9876543222',
          year: '3rd Year',
          department: 'Electrical and Electronics Engineering'
        }
      ],
      department: 'Electrical and Electronics Engineering',
      year: '3rd Year',
      projectTitle: 'Smart Solar Energy Management System',
      projectDescription: 'An intelligent solar energy management system that optimizes energy production, storage, and distribution using IoT and machine learning technologies.',
      problemStatement: 'Traditional solar energy systems lack intelligent monitoring and optimization capabilities, leading to inefficient energy utilization and poor performance tracking.',
      proposedSolution: 'Develop a smart solar energy management system with real-time monitoring, predictive analytics, and automated optimization features.',
      methodology: `
1. **System Design**: Design solar panel monitoring architecture
2. **IoT Implementation**: Deploy sensors for real-time data collection
3. **ML Algorithm Development**: Create predictive models for energy optimization
4. **Dashboard Development**: Build comprehensive monitoring dashboard
5. **Testing & Optimization**: Conduct performance testing and system optimization
      `,
      technicalApproach: `
- **Hardware**: Arduino, Solar panels, Current/Voltage sensors, Weather sensors
- **Software**: Python, React.js, Node.js, MySQL
- **Machine Learning**: Time series forecasting, optimization algorithms
- **Communication**: WiFi modules, MQTT protocol
      `,
      expectedOutcome: `
- 25% improvement in energy efficiency
- Real-time monitoring dashboard
- Predictive maintenance alerts
- Automated energy optimization
      `,
      timeline: '6 months',
      budget: '₹60,000',
      resources: 'Solar panels, Arduino boards, sensors, development tools, cloud services',
      facultyMentor: 'Dr. Lakshmi Narayanan',
      submissionDate: '2024-01-18T09:15:00Z',
      status: 'submitted',
      attachments: [
        { name: 'Solar_Project_Proposal.pdf', size: '3.1 MB' },
        { name: 'Technical_Specifications.pdf', size: '1.8 MB' }
      ]
    }
  ];

  // Store in localStorage for demo purposes
  localStorage.setItem('studentApplications', JSON.stringify(applications));
  return applications;
};

// Initialize sample data if not exists
export const initializeSampleData = () => {
  const existingData = localStorage.getItem('studentApplications');
  if (!existingData) {
    generateSampleApplications();
  }
};
