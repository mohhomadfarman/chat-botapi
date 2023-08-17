/*
 * Starter Project for WhatsApp Echo Bot Tutorial
 *
 * Remix this as the starting point for following the WhatsApp Echo Bot tutorial
 *
 */

"use strict";

// Access token for your app
// (copy token from DevX getting started page
// and save it as environment variable into the .env file)
const token = process.env.WHATSAPP_TOKEN;

// Imports dependencies and set up http server
const request = require("request"),
  express = require("express"),
  body_parser = require("body-parser"),
  axios = require("axios").default,
  app = express().use(body_parser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log("webhook is listening"));

// Accepts POST requests at /webhook endpoint
app.post("/webhook", (req, res) => {
  // Parse the request body from the POST
  let body = req.body;

  // Check the Incoming webhook message
  console.log(JSON.stringify(req.body, null, 2));

  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  if (req.body.object) {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
      let phone_number_id =
        req.body.entry[0].changes[0].value.metadata.phone_number_id;
      let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
      let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
      let userName = req.body.entry[0].changes[0].value.contacts[0].profile.name; // extract the message text from the webhook payload
      let userMsg = msg_body.toLowerCase()
     const dilogs = {
              hi:[
                {
                  text:`Hello ${userName}    🤖 **Welcome to GS Web Technologies Bot!**

I'm here to assist you with any questions you have about our services. Please select an option or type a keyword to get started:

1. 🌐 **Services**: Learn about the services we offer, including web design, development, e-commerce solutions, mobile apps, and digital marketing.

2. 📱 **Mobile Apps**: Discover how we create custom mobile apps for both iOS and Android platforms.

3. 🛍️ **E-commerce**: Explore our e-commerce solutions, from building online stores to integrating secure payment gateways.

4. 🎯 **Digital Marketing**: Find out how our digital marketing strategies can boost your online visibility and engage customers.

5. 🚀 **Projects**: View our portfolio of previous work showcasing our design and development capabilities.

6. ℹ️ **FAQ**: Answers to frequently asked questions about GS Web Technologies.

Type your question or select a number to proceed. Feel free to ask anything!
`
                }
                 ],
        
       1:[
           {
                  text: `Our services encompass a wide range of digital solutions to elevate your online presence:

🌟 **Web Design and Development**:
From concept to creation, we build stunning websites that resonate with your brand.

🛍️ **E-commerce Solutions**:
Launch your online store with our expert e-commerce solutions, complete with secure payment gateways.

📱 **Mobile App Development**:
We design and develop custom mobile apps for both iOS and Android platforms, ensuring seamless user experiences.

🎯 **Digital Marketing**:
Our digital marketing strategies enhance your online visibility, attract new customers, and drive engagement.

Learn more about each service on our website or feel free to ask questions!
`
                }
        ],
       2:[
           {
              text: `Our mobile app development process is tailored to deliver exceptional experiences:

📱 **Custom Apps**: We create unique, user-centric mobile apps for iOS and Android platforms.

💡 **Innovative Features**: Expect innovative features that engage users and align with your business goals.

🔄 **Seamless Performance**: Our apps are optimized for smooth performance and responsiveness.

Got specific requirements in mind? Let's discuss how we can turn your ideas into a reality!
`
           }
       ],
        3:[
           {
              text: `Elevate your e-commerce game with our comprehensive solutions:

🛍️ **Online Store Creation**: We craft visually appealing online stores that offer seamless shopping experiences.

💳 **Secure Payments**: Integrate secure payment gateways to facilitate hassle-free transactions.

📊 **Analytics and Insights**: Gain valuable insights into customer behavior and optimize your e-commerce strategy.

Ready to establish an impressive online store? Let's get started today!

`
           }
       ],
       4:[
           {
              text: `Our digital marketing strategies are designed to drive your brand's success:

🚀 **Online Visibility**: Increase your online presence through targeted digital marketing campaigns.

📈 **Engagement Boost**: Engage your audience with compelling content and interactive experiences.

📊 **Data-Driven Insights**: Analyze data to refine strategies and achieve optimal results.

Want to enhance your brand's digital footprint? Let's create a digital marketing plan that aligns with your objectives!

`
           }
       ],
       5:[
           {
              text: `Our portfolio showcases our commitment to excellence:

🌐 **Website Designs**: Explore a variety of website designs that capture our creative approach.

📱 **Mobile Apps**: See how our mobile apps cater to different industries and user needs.

🛍️ **E-commerce Successes**: Witness our e-commerce solutions in action, from elegant storefronts to streamlined checkouts.

Ready to join our portfolio of success stories? Let's collaborate on your next project!


`
           }
       ],
       6:[
           {
                  text:`❓ **Frequently Asked Questions**

**Q1: What services does GS Web Technologies provide?**
We offer a range of services including web design, web development, e-commerce solutions, mobile app development, and digital marketing services.

**Q2: Can you create custom websites?**
Yes, we specialize in creating custom websites tailored to your business needs and branding.

**Q3: How long does it take to complete a project?**
Project timelines vary based on complexity. We work closely with clients to establish clear timelines and milestones.

**Q4: Do you offer ongoing website maintenance?**
Yes, we provide ongoing maintenance and support to ensure your website is up-to-date, secure, and performing optimally.

**Q5: What technologies do you use for web development?**
We use a variety of technologies including HTML, CSS, JavaScript, and popular frameworks to build modern, responsive websites.

For more FAQs, visit our website's FAQ section.

Type "menu" to return to the main menu or ask any other question you have.`

                }
        ],
       
        defaults:[
           {
                  text:"Enter A Valid Input"
                }
        ]
              }
 const defaultProtect = dilogs["defaults"];
      console.log(dilogs[userMsg][0].text, "Name");
      
      axios({
        method: "POST", // Required, HTTP method, a string, e.g. POST, GET
        url:
          "https://graph.facebook.com/v12.0/" +
          phone_number_id +
          "/messages?access_token=" +
          token,
        data: {
          messaging_product: "whatsapp",
          to: from,
          text: { body: dilogs[userMsg][0].text },
//           "type": "template",
//     "template": {
//         "name": "hello_world",
//         "language": {
//             "code": "en_US"
//         }
       
//     },
        },
        headers: { "Content-Type": "application/json" },
      });
    }
    
    res.sendStatus(200);
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    res.sendStatus(404);
  }
});

// Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests 
app.get("/webhook", (req, res) => {
  /**
   * UPDATE YOUR VERIFY TOKEN
   *This will be the Verify Token value when you set up webhook
  **/
  const verify_token = process.env.VERIFY_TOKEN;

  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === verify_token) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});
