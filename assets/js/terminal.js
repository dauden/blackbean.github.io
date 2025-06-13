/**
 * Terminal.js - A JavaScript file for command line functionality
 * This file implements a command line interface that allows users to navigate
 * through different sections of the website using commands.
 */

(function() {
  "use strict";

  // Utility function to select DOM elements
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };
  const elementPos = select('#terminal');
  // Utility function to scroll to an element
  const scrollTo = () => {
    elementPos.scrollTop = elementPos.scrollHeight + 50;
  };

  // Markdown to HTML converter
  const markdownToHtml = (markdown) => {
    if (!markdown) return '';

    // Replace line breaks with <br> tags
    let html = markdown.trim().replace(/\n/g, '<br>');

    // Convert headings
    html = html.replace(/^# (.*?)(<br>|$)/gm, '<h1>$1</h1>$2');
    html = html.replace(/^## (.*?)(<br>|$)/gm, '<h2>$1</h2>$2');
    html = html.replace(/^### (.*?)(<br>|$)/gm, '<h3>$1</h3>$2');
    html = html.replace(/^#### (.*?)(<br>|$)/gm, '<h4>$1</h4>$2');
    html = html.replace(/^##### (.*?)(<br>|$)/gm, '<h5>$1</h5>$2');
    html = html.replace(/^###### (.*?)(<br>|$)/gm, '<h6>$1</h6>$2');

    // Convert bold text
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert italic text
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert images
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');

    // Convert links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Convert unordered lists
    html = html.replace(/^- (.*?)(<br>|$)/gm, '<li>$1</li>$2');

    // Convert ordered lists
    html = html.replace(/^\d+\. (.*?)(<br>|$)/gm, '<li>$1</li>$2');

    // Wrap lists in <ul> or <ol> tags
    // This is a simplified approach and might need refinement for nested lists
    let inList = false;
    let listType = '';
    const lines = html.split('<br>');
    html = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('<li>')) {
        if (!inList) {
          // Check if this is an ordered or unordered list
          const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
          if (nextLine.startsWith('<li>') && line.match(/^\d+\./)) {
            html += '<ol>';
            listType = 'ol';
          } else {
            html += '<ul>';
            listType = 'ul';
          }
          inList = true;
        }
        html += line;
      } else {
        if (inList) {
          html += `</${listType}>`;
          inList = false;
        }
        html += line + (i < lines.length - 1 ? '<br>' : '');
      }
    }

    if (inList) {
      html += `</${listType}>`;
    }

    // Convert blockquotes
    html = html.replace(/^&gt; (.*?)(<br>|$)/gm, '<blockquote>$1</blockquote>$2');

    // Convert code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // Convert inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Convert horizontal rules
    html = html.replace(/^---(<br>|$)/gm, '<hr>$1');

    return html;
  };

  // Command definitions
  const commands = {
    'about': {
      description: 'Display information about me',
      text: `
      # About me
      ## I'm Nguyen Ngoc Tuan Anh
      ![Avatar](assets/img/avatar.jpeg)
      You also call me "Black Bean" as close friend.
      Senior Full Stack Engineer.
      "Don't be a Tourist, be a Traveler"
      Degree: Bachelor of Science`,
    },
    'skills': {
      description: 'Show my skills and expertise',
      text: `
      # My Skills
      As a Full-Stack Engineer, I have experience working on both frontend and backend development, with a strong focus on backend technologies. I’ve primarily worked with Node.js and Java, while also gaining hands-on experience with other languages such as PHP, Ruby, and C#. My work spans developing APIs, building scalable server-side applications, and occasionally contributing to frontend features to deliver end-to-end solutions
      Restful: 15+ yrs Experienced
      Microservice: 10+ yrs Experienced
      Frontend: 7+ yrs Intermediate
      Backend: 17+ yrs Experienced
      System design: 8+ yrs Experienced
      Scrum: 16+ yrs Experienced
      DevOps: 5+ yrs Intermediate
      Systems Analysis: 6+ yrs Intermediate`,
    },
    'resume': {
      description: 'View my professional resume',
      text: `
      # My Resume
      The below is a short Summary about me. Please find more details about me as my [Resume here](assets/Anh_Nguyen.pdf).
      ## Summary
      ### Nguyen Ngoc Tuan Anh
      A software engineer, but I like and do a lot 'DIY'. Love Traveler, Trekking, Camp...
      ### Education
      - Bachelor of science in information technology Graduated in Ho Chi Minh City University of Science Ho Chi Minh city, Viet Nam
      - Higher diploma in software engineering Graduated in Hue-Aptech (HueITTC) Hue city, Viet Nam
      ## Professional Experience
      ### Principal Software Engineer
      Apr 2023 - Present
      Ringkas, Ho Chi Minh City, Viet Nam
      Join to The Ringkas on 2023 from Ho Chi Minh city,
      Working on Core Team to build a KPR platform that digitizes infrastructure and enables key stakeholders in the real estate ecosystem.
      ### Senior Consultant Engineer
      Feb 2020 - Feb 2022
      National Australia Bank, Ho Chi Minh City, Viet Nam
      Join to The NAB Innovation Centre Vietnam is part of National Australia Bank (NAB) Technology on 2020 from Ho Chi Minh city, working on Core Banking for Home Lending.
      Build service using Java, NodeJs with AWS for Home Lending Biz
      ... More
      please find more information from my [cv](assets/Anh_Nguyen.pdf)`,
    },
    'recommendations': {
      description: 'See recommendations from colleagues',
      text: `
      # Testimonial
      ## Ngân Nguyễn
      Senior Full Stack Developer
      Tuan Anh is driven and motivated in his work and does what is necessary to make the client happy and is willing to work extra if things are behind. He has an excellent knowledge of the software tools and understands how your projects work.
      ## Nghi Vo
      Senior Engagement Manager at Amazon Web Services (AWS)
      Tuan Anh is highly skill web developer. He showed a good knowledge on .NET platform and worked very well with the team. I would highly recommend him any time.
      ## Richard Wagstaff
      VP Operations, Sports Products, North America at Bally's Interactive
      Tuan Anh is a highly skilled full-stack developer with excellent attention to detail and dedication to delivery timescales. He was a valued member of our team with a great sense of humour and I would highly recommend Tuan Anh to any future employer.
      ## Hoang Nhut Nguyen
      Technical Director at Opus Solution
      I worked with Tuan Anh in several months in Technical team at HVN. He always keep good morale and helpfull for support. Quick reply with high quality in delivery, on-time release with fast research ability even in pressure environment.
      ## Thuan Tran Van
      COO at Cadena HRM | HR and Payroll Management Software for Southeast Asia.
      Tuan Anh has a responsibility and a can-do working attitude, combining with his experiences and skills in multiple fields, he has had a greate contribution to the current job and development at Cadena. Love to work with him not only as a colleague but also a close team member to get the job done get and get everyone satisfy.
      ## Hoàng Dũng Lê
      Tech-savvy leader
      Tuan Anh is an enthusiast developer, quick learner and a good problem solver. He can learn and apply new technologies easily. He a senior .NET developer, and also a PHP developer as well. In HVN, he have chances to supports multiple projects for solving technical issues and also for preparing automation build systems. It's my pleasure to work with him!`,
    },
    'contact': {
      description: 'Get my contact information',
      text: `
       # Contact 
      - Phone: +84 944 534 128
      - Website: [blackbean.icu](blackbean.icu)
      - Email: [me@blackbean.icu](me@blackbean.icu)
      - City: Ho Chi Minh City, Viet Nam
      `,
    },
    'exit': {
      description: 'Exit command line interface',
    },
    'help': {
      description: 'List available commands',
    }
  };

  // Function to parse and execute commands
  const executeCommand = (commandText) => {
    const originalCommand = commandText;

    // Remove the '\d ' prefix if present
    if (commandText.startsWith('\\d ')) {
      commandText = commandText.substring(3).trim();
    } else {
      displayResult(`Command not found: ${commandText}. Type '\\d help' for available commands.`, originalCommand, originalCommand);
      startQueue();
      return false;
    }

    // Check if the command exists
    if (commands[commandText]) {
      // For help command, pass the original command
      if (commandText === 'exit') {
        select('body').classList.toggle('command-line');
      }
      else if (commandText === 'help') {
        displayResult('Available commands:', originalCommand, originalCommand);
        Object.keys(commands).forEach(cmd => {
          displayResult(`\\d ${cmd} - ${commands[cmd].description}`, null);
        });
      } else {
        displayResult('', originalCommand, originalCommand);
        if(commands[commandText].text) {
          const items = commands[commandText].text.split("\n");
          items.forEach((item) => {
            displayResult(markdownToHtml(item), null, null);
          });
        }
      }
      startQueue();
      return true;
    } else {
      displayResult(`Command not found: ${commandText}. Type '\\d help' for available commands.`, originalCommand, originalCommand);
      startQueue();
      return false;
    }
  };

  const taskQueue = [];
  const startQueue = () => {
    if(taskQueue.length > 0) {
      const task = taskQueue.shift();
      const typing = select(`#${task.id}`);
      new Typed(typing, task);
      scrollTo();
    }
  }
  // Function to display command results
  const displayResult = (text, command = null, input) => {
    const resultElement = select('#terminalResult');
    if (resultElement) {
      // If a command was provided, show it with the prompt
      if (command) {
        const commandHtml = `<div class="terminal-history-line"><span class="terminal-prompt">blackbean-site:$</span> ${input}</div>`;
        // Append the command and result to the existing content
        resultElement.innerHTML += commandHtml;
      }
      if(!text || text ==='') {
        return;
      }
      const timestamp = new Date().getTime();
      // Create a unique ID for this output
      const outputId = `terminal-output-${timestamp}-${taskQueue.length}`;

      // Add an empty div with the unique ID for the typing animation
      resultElement.innerHTML += `<div id="${outputId}" class="terminal-output"></div>`;
      resultElement.style.display = 'block';

      // Use typed.js to animate the text
      taskQueue.push({
        id: outputId,
        strings: [text.replace(/\n/g, '<br>')],
        typeSpeed: 30,
        startDelay: 10,
        showCursor: false,
        loop: false,
        onBegin: () => scrollTo(),
        onComplete: () => {
          // Initial scroll to show the typing happening
          startQueue();
        }
      });
    }
  };

  // Initialize the terminal
  const initTerminal = () => {
    // Get the terminal input element
    const terminalInput = select('#terminalInput');
    if (!terminalInput) return;

    // Add event listener for input
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = terminalInput.value.trim();
        if (command) {
          executeCommand(command);
          terminalInput.value = '';
          terminalInput.placeholder = '';
        }
      }
    });
  };

  // Function to be called when the terminal is shown
  // Expose the showTerminalHelp function globally
  window.showTerminalHelp = () => {
    // Clear any existing content in the terminal result
    const resultElement = select('#terminalResult');
    if (resultElement) {
      resultElement.innerHTML = '';
    }
    executeCommand('\\d help');
  };

  // Initialize when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    initTerminal();

    // Handle command from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const command = urlParams.get('command');
    if (command) {
      executeCommand(command);
    }
  });

  // Expose the executeCommand function globally
  window.executeCommand = executeCommand;
})();
