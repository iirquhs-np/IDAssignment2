# ID Assignment 2

COMZONE - Singapore's #1 Customisable High Performance PC Builders.

This is a one-stop platform for users to customise and build their own premium quality PC that is suitable for gaming and all kinds of work, contact COMZONE for post-sales technical support and warranty, as well as participate in seasonal festive events to earn lucrative prizes.

Access our Pitch Video [here](https://drive.google.com/file/d/1Uy-Vsuuw-vl0euIBOAufESQBLb_oaRiB/view?usp=sharing).
Access our Pitch Deck [here](https://docs.google.com/presentation/d/1N-fBp1VIcXU6DMlieUfwCiY-cyPq8MRwYUaaMQdTb2o/edit?usp=sharing).
Access our Github Page [here](https://github.shuqri.xyz/comzone.sg/).
 
## Design Process

We adopted a five-step website development process designed by our very own COMZONE web team. The five steps are Ideate, Research and Implement, Test and Improve.
1. Ideate: We brainstormed possible projects that can both showcase our web development skills and be as realistic as possible. We finalised on an e-Commerce platform specialising in custom PC builds. The target audiences are PC buyers, including amateurs and professionals, who are looking to customise their specifications. We reckoned that our website will be able to help them best since we provide a straight-forward platform for both pre-specified and customisable PC systems. 
2. Research: We did some desktop research on how our competitors, including [Aftershock](https://www.aftershockpc.com), [Dreamcore](https://dreamcore.com.sg), [Mansa Computers](https://www.mansacomputers.com), [Monster PC](https://www.monsterpc-sg.com) etc, design their website and its relative processes. We also surveyed our friends and families on what they expect in such a PC building website. The followings are taken from the survey:
    - As an amateur buyer, I want to easily purchase a pre-specified PC system as I know nothing about PC parts, so that I can obtain a PC that works for me quickly.
    - As a professional buyer, I want to customise my PC, so that I can obtain a cost-effective PC that is maxed out for my needs and at the same time do not overkill in terms of specs. 
    - As a COMZONE owner, I want to easily store information such as customer details and stock count in a database that is reflected live on the website, so that my business can handle a huge userbase.
    - As a COMZONE owner, I want to provide my customers with easy access to FAQs so that their queries can be quickly answered, as well as a contact channel so that more difficult questions that require manual replies can also reach me. 
3. Implement: We coded the website and hosted it on Github pages. Along the way, we read up on resources such as [W3Schools](https://www.w3schools.com) and [Bootstrap](https://getbootstrap.com).
4. Test: We made a to-test checklist and tested all the features required and implemented. Such to-tests include device optimisation, hyperlinks, numerical calculations, APIs etc. Only features that pass on both authors' devices are considered completed.
5. Improve: We identified errors, fixed them and retest. We also jotted down a list of features that can be implemented in the future.

## Features

Following is a list of all existing features and features left to implement that are available on both laptop and mobile.

### Existing Features
- Responsive Navigation Bar - Appears as a full-width navigation bar on desktop and a collapsed hamburger menu on mobile, empowering users with the best shopping experience and at the same time not compromising on any important features.
- Testimonial Slideshow - Allows users to read the reviews of other buyers.
- Mailing List - Allows users to submit their email addresses to subscribe to COMZONE's regular supply of e-newsletter.
- Contact Form - Enables users to contact COMZONE.
- Social Media Bar - Enables users to quickly teleport to COMZONE' social media accounts.
- Geolocation & Currency Exchange - Enables users to pick which country they are shopping from and the website will automatically convert the pricings on the website to the respective currency.
- Back To Top Button - Enables users to quickly jump back to the top of the page by clicking this sticky button located at bottom right of the browser.
- Quick Add To Chart - Allows users to add pre-specified PC builds to their carts.
- PC Customisation - Allows users to customise their PC parts, by having them click on the different options for each field in a PC Customisation page.
- Festive Events (CNY) & Leaderboards - Ranks users based on the membership points they obtained throughout the event period. Top 3 gets cash prizes.
- Membership System - Enables users to create and log in to accounts to use the membership points systems. Users can also change their passwords or delete their accounts.
- Membership Points - Enables users to earn membership points with every dollar spent on the website and use these points to redeem for rewards.
- FAQ page - Enables users to quickly find answers to common questions.
- Shopping Cart - Enables users to add and/or remove products to their shopping carts. There is also a live reflection of the number of items in their carts as well as the live tabulation of the total order price.
- Checkout System - Enables users to add the relevant information (eg. contact details, cedit card details, shipping and billing addresses) to complete the orders. 

### Features Left to Implement
- Forums - Facilitates users' discussion of custom PC building at COMZONE.
- Bulk Purchases - Allows corporates to purchase PCs in bulk. A price tier will also implemented such that the more PCs they buy, the cheaper the price per PC.
- On-site Mini Games - Gamifies the shopping experience further to add more fun. Such games can include a lucky draw, survey for rewards etc.
- Wish List - Allows users to add products they wish to purchase in the future into the list. They can then retrieve this list later on when they log back into their account.
- Live Chat - Enables users to quick support through a live chat system with our sales agents.
- Order Tracking - Enables users to track the progress of their orders. Such a progress includes stages such as order processing, PC assembling, in shipping etc.
- Order History - Enables users to see what they bought in the past.

## Technologies Used

- HTML
    - The project uses **HTML** to build the structure of the website.
- CSS
    - The project uses **CSS** to style the looks of the website on both laptop and mobile.
- [JS](https://www.javascript.com)
    - The project uses **JS** to add interactivity to the website.
- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.
- [Data Protection Notice Generator](https://apps.pdpc.gov.sg/dp-notice-generator)
    - The project uses **DPN Generator** to generate a Data Protection policy.
- [Terms and Conditions Generator](https://www.termsandconditionsgenerator.com)
    - The project uses **T&C Generator** to generate a Terms and Conditions. 
- [Lottie Files](https://lottiefiles.com)
    - The project uses **Lottie Files** to implement beautiful light-weight animations. 
- [Bootstrap](https://getbootstrap.com)
    - The project uses **Bootstrap** to implement some beautiful light-weight codes. 
- [RestDB](https://restdb.io)
    - The project uses **RestDB** to implement NoSQL databases. 
- [Exchange Rate API](https://www.exchangerate-api.com)
    - The project uses **Exchange Rate API** to pull currency conversion rates for its currency converters. 

## Testing

1. Newsletter Subscription: 
    1. Go to the Newsletter Subscription section on index.html.
    2. Try to submit the form with an empty email address and verify that an error message about the required fields appears.
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears.
    4. Try to submit the form with a valid email address and verify that it goes through into the database.

2. Contact Form:
    1. Go to the Contact Form section on index.html.
    2. Try to submit the empty form and verify that an error message about the required fields appears.
    3. Try to submit the form with an invalid name (contains numbers) and verify that a relevant error message appears.
    4. Try to submit the form with an invalid email address and verify that a relevant error message appears.
    5. Try to submit the form with an empty email address and verify that an error message about the required fields appears.
    6. Try to submit the form with an invalid contact number and verify that a relevant error message appears.
    7. Try to submit the form with an empty contact number and verify that an error message about the required fields appears.
    8. Try to submit the form with an empty message and verify that an error message about the required fields appears.
    9. Try to submit the form with all inputs valid and verify that a success message appears.
    10. Go to the Contact Form section on support.html.
    11. Repeat steps 2 to 9. 

3. Currency Exchanger:
    1. Go to the different pages with prices labelled.
    2. Note the prices reflected in SGD (by default).
    3. Go to the footer and change the location to another country (such as China).
    4. Go back to the different pages with prices labelled.
    5. Check if the prices reflected are now multiplied by the conversion rate.

4. Price Calculation:
    1. Go to explore.html.
    2. Try customising a random PC (such as Rapid).
    3. Play around with the different specs options and check if the total price reflected is correct.
    4. Go to cart.html.
    5. Add or subtract the items in the cart and check if the total price reflected is correct.
    6. Go to checkout.html.
    7. Play around with the different shipping options and check if the total price reflected is correct.
    8. Enter a valid promo code and check if the total price reflected is correct.

5. Cross-platform Optimisation:
    1. Go to laptop view and verify that all included content are visible, as intended and working.
    2. Go to iPhone XR view and verify that all included content are visible, as intended and working. Note that when the website is switched to mobile view, features might be displayed differently such that it makes more sense for a smaller screen. This includes changing row-viewed content into column-viewed content using flex boxes etc.

## Credits

### Content
- The text for the website was copied, with slight amendments, from [Aftershock](https://www.aftershockpc.com)

### Media
- The video used for the hero banner (desktop view) on index.html was obtained from [YouTube](https://www.youtube.com/watch?v=QwwrqY5IoZg)
- The image used for the hero banner (mobile view) on index.html was obtained from [Aftershock's Facebook](https://www.facebook.com/AfterShockPC/photos/pcb.2317545125043272/2317545035043281/?type=3&source=49)
- The images used for the PC models were obtained from [Aftershock](https://www.aftershockpc.com)
- The icons used for the website was obtained from [Icons8](https://icons8.com), 
- The video used for the spotlight video on index.html was obtained from [YouTube](https://www.youtube.com/watch?v=Va18zfmeaD4)
- The images used for the profile pictures for the pro endorsement and testimonial sectiosn on index.html were obtained from [Esportspedia](https://esportspedia.com/streamers/WARDELL), [Unsplash](https://unsplash.com/)([Image 1 by Andre Hunter](https://unsplash.com/photos/ugjPgy2BQug), [Image 2 by Ella Don](https://unsplash.com/photos/Pk6Y3yVVNz4), [Image 3 by Mahdi Chaghari](https://unsplash.com/photos/RqO_02KT36w), [Image 4 by Ian Dooley](https://unsplash.com/photos/d1UPkiFd04A)) and [Pexels](https://www.pexels.com/photo/portrait-photography-of-woman-1258196)
- The animation used for the contact form was obtained from [Lottie Files](https://lottiefiles.com/68036-mail)
- The icons used for the social media bar in the footers were obtained from [Font Awesome](https://use.fontawesome.com/releases/v5.15.4/js/all.js)
- The image used for the header image on explore.html was obtained from [PNG Item](https://www.pngitem.com/middle/TTRmiR_transparent-computer-png-gaming-pc-transparent-png-png/)
- The animation used for the header animation on rewards.html was obtained from [Lottie Files](https://lottiefiles.com/92478-money)

### Acknowledgements

- We received inspiration for this project from [Aftershock](https://www.aftershockpc.com)
- We am grateful for Mr Suresh Kumar's unwaivering support and constructive feedback throughout the whole assignment
