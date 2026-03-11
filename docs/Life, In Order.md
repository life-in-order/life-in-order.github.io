Life, In Order

| Executive Summary |
| :---- |

Life does not come with a manual. People were never taught the list of things they have to do on a regular basis to maintain an organized life. **Life, In Order** provides an authoritative list of ongoing responsibilities all humans should do so they can have a solid foundation to pursue the higher aspects of life. 

Life, In Order provides comprehensive, expert-vetted advice, an automated system for reminding, and motivation to help users actually complete the tasks they need. 

| Problem Statement |
| :---- |

Life does not come with a manual. Everyone goes through life vaguely aware they should be responsible and keep up-to-date on the responsibilities they should do on a regular basis, but even if they want to, **they don’t know what to do or how to do them.**

**There’s no centralized place for understanding the list of ongoing responsibilities for leading an organized life.** 

**Even if people are aware of the tasks they should complete, they may forget to do so.** 

**There is resistance to doing a task even if people know they should.** While we wish we could be perfect, we need the extra push to actually do the things we should be doing. People don’t understand why they have to go through these responsibilities, or they misjudge the criticality. Both misunderstandings add activation energy.

| Personas and Specific User Pain Points (not exhaustive) |
| :---- |

Health-conscious individuals who want to stay healthy but do not know all of the steps to do so, particularly as they age. 

* Reminders to pick up/refill meds  
* Various screenings/tests they should do over the years and every year  
* Mental health sub-checklist  
* As you age, simple weight-training exercises so you don’t dessicate  
* Reminders to use up insurance benefits

Home-owners who have to keep up with maintenance so they can avoid expensive repairs. 

* When to replace appliances  
* Gutter cleaning  
* [Home Ownership Timeline Sheet](https://docs.google.com/spreadsheets/d/19sTg5l0i7BuYIgTxp60nSCW8_1lHMXUJG9B-Ak6pt94/edit?gid=0#gid=0)  
* Next  
  * Upgrading your home (e.g. adding ev charging)  
  * Planning to renovate? Process \- architects, contractors, permits, etc. finding storage, a place to stay in the meantime, etc.

Car-owners who want to know the regular maintenance needed to keep their car in as good condition for as long as possible. 

* Oil changes  
* Regular maintenance/servicing  
* Tire rotation  
* Tire replacement   
* Transmission fluid  
* Cabin filter   
* Engine filter   
* Replacing windshield wipers  
* Brake replacement 

Career growth

* Annual raise discussion  
* Regularly update brag doc  
* Regularly save positive feedback and request feedback from peers/managers  
* Set aside regular time for learning

Finances 

* Taxes   
* IRA conversion   
* Use insurance benefits   
* Estate planning   
* \[One time\] set recurring savings   
* \[Recurring\] increase recurring savings 

| Requirements |
| :---- |

Phase 1

| Timeline UX | Right-scrolling for desktop  The default view will be a timeline at the bottom of the page with clickable ages. For each category of timelines (medical, homeownership, personal finance, etc.),  there will be a summary of tasks that appear next to each other.   |
| :---- | :---- |
| Individual checklist item  | Item title  Brief Description of what  Why should I do this / what happens if I don’t  \[Red, Yellow, Green\] criticality  Exact step-by-step Estimated time (monetary cost?) Reduce Activation Energy: Pre-written email templates to send to doctors/mechanics Phone scripts for scheduling Links to find providers/services near them "Add to calendar" buttons Button to mark item as completed   |
| Personalization  | User enters how old they are, their house / car are, and the timeline will be tailored to the items they need to complete.  |
| Timeline information  | [Medical Timeline Sheet](https://docs.google.com/spreadsheets/u/0/d/1Yz-Sh6ZnM4_TetSUZK8DIg4HY69FU82qYLCJvnn19H4/edit)	 [Home Ownership Timeline Sheet](https://docs.google.com/spreadsheets/d/19sTg5l0i7BuYIgTxp60nSCW8_1lHMXUJG9B-Ak6pt94/edit?gid=0#gid=0) |
| Data Model | User (Entity) List of checklist items completed  Age  House (Entity) List of checklist items completed  Age  Checklist Topic  Description  List of checklist items  What type of entity it applies to  Individual checklist item  Individual checklist item id  Item title  Description  Why should I do this  Criticality  Red, Yellow, Green List of Step by Step  Source  Time completed  What type of entity it applies to  What year it should be completed  |
|  |  |

Phase 2

- [ ] Email (paid?)   
      - [ ] Reminder to get the screening   
      - [ ] Tools: Brevo  
      - [ ] Personalized  
            - [ ] Have the option of checking off items in the email  
            - [ ] You've checked off these items   
      - [ ] Make it so that it's not just like c1 hep b reminder   
      - [ ] Year in review \- celebrating the accomplishments  
      - [ ] Here are the recommended actions   
- [ ] Accountability Features:  
      - [ ] Share your timeline with a partner/family member  
      - [ ] "Accountability buddy" system  
- [ ] A one-click "I'll do this Saturday" button that:  
      - [ ] Adds a concrete plan to their calendar  
      - [ ] Sends prep info (what to bring, questions to ask)  
      - [ ] Follows up afterward to mark complete

Phase 3

- [ ] Individual user one-off custom checklist items 

Phase 4 

- [ ] User-contributed checklists  
      - [ ] User safety   
      - [ ] Monetization  
      - [ ] Creator tools   
      - [ ] Social media sharing   
      - [ ] Trustworthiness

| User Journeys |
| :---- |

| Open Questions |
| :---- |

* How to have enough credibility compared to a hospital or government agency?   
* Free vs paid tier   
  * Custom reminders   
* How important is it to have a mobile surface?

| Prompt |
| :---- |

Sources:  
[https://communityhealth.mayoclinic.org/prevention-and-wellness/adult](https://communityhealth.mayoclinic.org/prevention-and-wellness/adult)  
[https://www.uspreventiveservicestaskforce.org/uspstf/recommendation-topics/uspstf-a-and-b-recommendations](https://www.uspreventiveservicestaskforce.org/uspstf/recommendation-topics/uspstf-a-and-b-recommendations)  
