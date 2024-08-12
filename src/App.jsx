import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const initialLogs = [
  {
    id: 1,
    date: "January 13th, 1981 – 18:47",
    title: "Programmer’s log – Morgan Albright",
    content: `Today is day 6 of Operation Golden Eagle. Assets Kirk, Stevenson, Wozniak, and I remain stationed at the NORAD defence outpost 20km North of Inuvik, Northwest Territories. I have now reached 59% completion of the defence update to the advanced computer system 808813 or “Bobbie” as we casually refer to her. Estimated completion of the update by the end of this week.`
  },
  {
    id: 2,
    date: "January 16th, 1981 – 09:15",
    title: "Programmer’s log – Morgan Albright",
    content: `Day 9 of Operation Golden Eagle, full defence system update to Bobbie has been completed successfully. Asset Stevenson has now been able to begin birdwatching as all systems are online. Asset Kirk will send out a standard check-in message via cipher to the nearby bases to notify them of our position and status.

    We’ve learned of a severe winter storm expected to roll through the area over the weekend and expect to be snowed in. I will be ensuring the full functionality of our software systems during the storm.`
  },
  {
    id: 3,
    date: "January 18th, 1981 – 14:22",
    title: "Programmer’s log – Morgan Albright",
    content: `The storm is persisting, and we are experiencing very heavy amounts of wind and snow. We are remaining inside for the foreseeable future as we await a break from this weather. The outpost is fully stocked with enough rations to last the four of us comfortably to the next month.`
  },
  {
    id: 4,
    date: "January 18th, 1981 – 16:37",
    title: "Programmer’s log – Morgan Albright",
    content: `The winter storm has worsened severely. Large hail pellets have damaged some of our external hardware, resulting in reduced functionality. Bobbie has retained her most important features; we are still able to send and receive emergency messages and strategize defence positions. Asset Stevenson’s birdwatching is on a temporary storm hold, but he has collected enough data to decipher that there is no current movement or threat from the Reds.`
  },
  {
    id: 5,
    date: "January 19th, 1981 – 03:33",
    title: "External log",
    content: `Received emergency signal from base station 4769
    Received emergency signal from base station 4769
    Received emergency signal from base station 4769

    SOS… assistance requested… loss of…`
  },
  {
    id: 6,
    date: "January 19th, 1981 – 03:38",
    title: "Programmer’s log – Morgan Albright",
    content: `Our base has received an emergency SOS message from a nearby research station near Aklavik. The message that came through was very choppy and Bobbie couldn’t transmit it fully. I believe that this is a result of the storm and external hardware issues rather than an issue with Bobbie’s programming.

    The four of us are divided over what to do in response to this SOS message. According to Bobbie, station 4769 is one of ours, however, it isn’t supposed to be manned at this time. This could be a potential oversight from HQ. Wozniak and Kirk believe that we should venture out into the storm and try to assist station 4769. Stevenson is pushing to wait a few days in hopes that the storm will lighten. I ran a statistical analysis of the likelihood of us discovering station 4769 under the current conditions and Bobbie created a 37% success rate, predicting unfavourable results for both us and whoever is located at the research station.`
  },
  {
    id: 7,
    date: "January 19th, 1981 – 03:42",
    title: "Morgan’s log - Personal",
    content: `The stats that I ran using Bobbie are making me really worried for our team’s safety if we try to go and recover any survivors from station 4769. Even if we’re able to safely find them, we don’t know how many people we’ll be taking in and what that would mean for our rations.

    I didn’t tell the others that when Bobbie ran the analysis, she also produced a message stating that despite the low likelihood of success, we’re duty-bound to answer the SOS call. I left that information out because it would sway the rest of my team heavily. Bobbie is a “smart computer”, but she’s not so smart that she should be the one to make big judgment calls on our behalf.`
  },
  {
    id: 8,
    date: "January 19th, 1981 – 03:46",
    title: "Programmer’s log – Morgan Albright",
    content: `Since we remain divided, we defer to senior officer Stevenson’s judgement. The situation has caused tensions to rise among the ranks here as Kirk and Wozniak are not pleased with Stevenson’s decision.`
  },
  {
    id: 9,
    date: "January 22nd, 1981 – 08:05",
    title: "Programmer’s log – Morgan Albright",
    content: `The storm has not faltered in the days that we’ve waited. No communication has been received from station 4769 since the SOS message three days ago.

    Kirk and Wozniak have decided to go and investigate by snowmobile while Stevenson and I man the base. The Aklavik research station is approximately 15km southwest of our location. Kirk and Wozniak will circle in a 15km radius around our base, and if they are unable to spot the research station or any survivors within 30 minutes, they will return.`
  },
  {
    id: 10,
    date: "January 22nd, 1981 – 09:21",
    title: "Programmer’s log – Morgan Albright",
    content: `Assets Kirk and Wozniak returned a few minutes ago, completely covered in snow, but with three surviving scientists in tow.

    They explained to us that they were conducting a classified research project at the Aklavik station when they experienced a total loss of power due to the storm. Unfortunately, they recount two team member casualties as a result of attempting to restore power and operational procedures to their station.

    As per Stevenson’s orders, we will provide shelter and food to the three survivors while we wait for the storm to pass. Wozniak will then travel back with them to assist with restoring power to station 4769.

    I feel a slight unease about the situation. The survivors recounted losing two of their team members, however, these three remain miraculously unharmed and seemingly unbothered. I’ve run additional analyses through Bobbie, and updated them to reflect our current situation, and taking on these three for an indeterminate amount of time poses large risks for our team and for Operation Golden Eagle.`
  },
  {
    id: 11,
    date: "January 22nd, 1981 – 09:30",
    title: "Morgan’s log – Personal",
    content: `I don’t like having these scientists here at our base. The whole situation just seems off to me and honestly, when they told us their story, they were shockingly devoid of emotion. There’s something not right about them, I just can’t quite put my finger on what it is.

    Not wanting to stress or scare the rest of my team, I didn’t tell them that the latest analysis predicted that our food supply would now only last all of us for about two or so weeks.`
  },
  {
    id: 12,
    date: "January 23rd, 1981 – 05:43",
    title: "Internal log",
    content: `Activity detected. Threat level red. Location 68.7012° N, 133.3439° W
    Activity detected. Threat level red. Location 68.7012° N, 133.3439° W
    Activity detected. Threat level red. Location 68.7012° N, 133.3439° W`
  },
  {
    id: 13,
    date: "January 23rd, 1981 – 07:35",
    title: "Programmer’s log – Morgan Albright",
    content: `Early this morning, Bobbie produced a message stating the detection of Soviet activity near to our location. This is an unexpected setback to Operation Golden Eagle. Since Asset Kirk’s birdwatching had to be held due to the ongoing storm, we are now left unprepared should the Reds find our exact location.

    Stevenson has ordered a full lockdown of our base. I am increasing Bobbie’s security measures to the best of my abilities despite the storm. Wozniak has attempted to fix the external hardware, but to no avail. I am somewhat confident that Bobbie will be able to continue to detect changes in Soviet movement throughout the remainder of the storm.

    I can’t help but wonder if Wozniak and Kirk heading out to help the survivors contributed to this situation at all. The storm has been heavy, but perhaps the Reds were able to spot them when they went out to station 4769. Perhaps the members of station 4769 were the ones to originally tip off the Reds with their emergency message. Hopefully, our base location hasn’t been compromised.`
  },
  {
    id: 14,
    date: "January 23rd, 1981 – 07:41",
    title: "Morgan’s log – Personal",
    content: `The sudden Soviet activity is very suspicious to me. I can’t shake my uneasiness and the feeling that this may have something to do with the Station 4769 survivors. I make no accusations… but I don’t trust them.

    I’ve decided to discreetly enable some of Bobbie’s more advanced security features, just in case the scientists try anything funny.`
  },
  {
    id: 15,
    date: "January 23rd, 1981 – 12:10",
    title: "-",
    content: `-`
  },
  {
    id: 16,
    date: "January 23rd, 1981 – 16:24",
    title: "Programmer’s log – Morgan Albright",
    content: `So far, we have not received further notice of Soviet movement, however, we remain on high alert.

    It appears that someone may have tampered with my machine earlier today. There is a previous log entry from 12:10 that I do not recognize. I plan to confront the scientists from station 4769 to determine exactly what happened.`
  },
  {
    id: 17,
    date: "January 23rd, 1981 – 16:27",
    title: "Morgan’s log – Personal",
    content: `Someone touched my computer. Whether they were able to access my Programmer’s logs, I can’t be sure. The extra security measures I put in place should have been foolproof. Did they hack Bobbie somehow to be able to get through?

    The only silver lining is that my logs were fully locked and unreadable. I know it had to be one of those “scientists”. Each day that passes I become more and more suspicious of them. I haven’t said anything as to hopefully not tip them off, but I’m starting to get worried for our mission’s safety. I’ll try to dig deeper when I confront them and see what useful information I can uncover.`
  },
  {
    id: 18,
    date: "January 23rd, 1981 – 18:07",
    title: "Programmer’s log – Morgan Albright",
    content: `Following a discussion with head scientist Smith, it appears that she was the one who tampered with my system. She explained to me that station 4769 was conducting some additional robotics-related research, and she was curious about Bobbie after Kirk discussed our state-of-the-art advanced computer system with her. Smith cheerfully mentioned the exploration of “human-like robotic individuals” at their research station.

    I have not heard of any branch of NORAD conducting such research. I am no longer sure that it remains safe to shelter the survivors here.

    The ease with which Smith felt as though she could peruse my system and attempt to view confidential information makes me deeply uncomfortable. I’ve scheduled a high-priority meeting with Stevenson to discuss this ASAP.`
  },
  {
    id: 19,
    date: "January 23rd, 1981 – 18:11",
    title: "Morgan’s log – Personal",
    content: `I was right. Smith was the one who touched my computer and I’m almost certain now that she must be some type of Soviet spy that was looking for information.

    How she was able to hack Bobbie, I still don’t understand. Our system is set up so that one would need to know the NORAD-specific codes to make any changes or to access confidential information. These women are definitely not NORAD.`
  },
  {
    id: 20,
    date: "January 23rd, 1981 – 19:00",
    title: "Programmer’s log – Morgan Albright",
    content: `Asset Stevenson has concurred with me that our situation no longer remains safe. He will be transmitting an urgent classified message to HQ via cipher to determine if we have been compromised and to request rapid extraction of our team.`
  },
  {
    id: 21,
    date: "January 23rd, 1981 – 19:36",
    title: "Internal log",
    content: `Activity detected. Threat level red. Location 68.7012° N, 131.5129° W
    Activity detected. Threat level red. Location 68.7012° N, 131.5129° W
    Activity detected. Threat level red. Location 68.7012° N, 131.5129° W`
  },
  {
    id: 22,
    date: "January 23rd, 1981 – 19:41",
    title: "Programmer’s log – Morgan Albright",
    content: `The Soviets have moved again. Bobbie detected additional movement. The Reds are approaching.

    We now face both an external and an internal threat. As we hope that our location remains concealed from the Reds, we must also remain neutral with the station 4769 scientists while awaiting instruction from HQ.`
  },
  {
    id: 23,
    date: "January 23rd, 1981 – 19:48",
    title: "Morgan’s log – Personal",
    content: `I fear that Smith may have sent some sort of signal out to her “comrades” when she tampered with my system.

    It doesn’t make sense though; Bobbie is supposed to have a fail-safe feature that would prevent any direct communication with anyone outside of our organization. How was Smith able to signal to the Soviets using Bobbie?

    Something very strange is going on here and I’m starting to think that our own systems may not be safe anymore.`
  },
  {
    id: 24,
    date: "January 24th, 1981 – 00:26",
    title: "Programmer’s log – Morgan Albright",
    content: `Asset Kirk has disappeared from base. He and one of the scientists stepped outside last night to secure the exterior. I heard a scream. Only the scientist returned. She came inside with no signs of the cold, despite having gone outside in -30-degree weather for over an hour.

    She explained to Stevenson that Kirk slipped on a patch of ice and struck his head. She claims that the snow is coming down so quickly and heavily that she lost sight of his body almost instantly.

    I suspect foul play. Something is not quite right about these “scientists”.`
  },
  {
    id: 25,
    date: "January 24th, 1981 – 00:29",
    title: "Morgan’s log - Personal",
    content: `They killed Kirk. I know they killed him. I’m no fool, I don’t buy into their “he slipped on the ice” story. Station 4769 was full of Reds and now they’ve infiltrated our base and are starting to pick us off one-by-one.

    I need to stay vigilant and protect myself. I can only hope that HQ responds to our message quickly and before anyone else gets hurt.`
  },
  {
    id: 26,
    date: "January 24th, 1981 – 05:47",
    title: "Programmer’s log – Morgan Albright",
    content: `There has been a slight letup in the storm, so Wozniak and Stevenson have decided to step outside in an attempt to recover Kirk’s body. Two of the scientists have gone to assist them, while scientist Smith perches in the corner observing me.

    I’ve set up Bobbie’s emergency internal security measures so that the members of station 4769 cannot access our files.

    We urgently await word from HQ on our safe extraction.`
  },
  {
    id: 27,
    date: "January 24th, 1981 – 05:52",
    title: "Morgan’s log - Personal",
    content: `I’ve again tried to lockdown Bobbie so that the Soviets can’t send any more signals. The last thing I want is for these three to get the backup that they’ve been waiting for to wipe us all out.

    This may be one of my last logs. I’m not sure that we can even trust Bobbie at this point; the advanced computer system I’ve been working on all this time may be my undoing.

    I checked the records and our message to HQ was never sent. The lockdown procedures that I’m trying to implement have failed again.

    Logging everything may be causing more bad than good at this point. I’m not sure if Bobbie can use my logs against me and the rest of the team. With no way to call for help and a system that’s turning against us I’m afraid that we’re sitting ducks. I’m scared.`
  },
  {
    id: 28,
    date: "January 24th, 1981 – 07:28",
    title: "Internal log",
    content: `Activity detected. Threat level red. Location 68.7012° N, 131.2237° W
    Activity detected. Threat level red. Location 68.7012° N, 131.2237° W
    Activity detected. Threat level red. Location 68.7012° N, 131.2237° W`
  },
  {
    id: 29,
    date: "January 24th, 1981 – 07:32",
    title: "Programmer’s log – Morgan Albright",
    content: `SOS. SOS. Urgent transmission sent. Requesting assistance.

    Assets Wozniak and Stevenson have not returned from outside. The two scientists have come in unscathed.

    Bobbie has detected the Soviets closing in on our location.

    I’ve armed myself secretly as I believe that the “scientists” will come after me next. I fear that this won’t do much though as I don’t believe that these women are human.

    Smith’s cheerful explanation of the “human-like” androids, the fact that station 4769 was not supposed to be manned, the way that the cold has not affected them. I believe that the survivors we took in must be Soviet robotic creations. It sounds mad, but I’m sure of it. Bobbie started to detect movement as soon as we helped them and now the Reds are nearly upon us.`
  },
  {
    id: 30,
    date: "January 24th, 1981 – 07:37",
    title: "Morgan’s log – Personal",
    content: `I know them to be android Soviet spies, I’m 100% sure of it. They’re backup is fast approaching our base and I’m the only man left standing.

    Smith has been watching me with her dead eyes and I can see the cogs turning in her head, she’s waiting for the perfect moment to get rid of me like they did Kirk, Stevenson and Wozniak.

    I found a gun. I don’t exactly know how to use it, but I will if I must.

    I’m not even sure if my SOS transmissions were successfully sent out. Bobbie could be keeping them internal. I wonder if she knows I’m on to her too.`
  },
  {
    id: 31,
    date: "January 24th, 1981 – 07:38",
    title: "Programmer’s log – Morgan Albright",
    content: `SOS. SOS. Urgent transmission sent. Requesting assistance.
    SOS. SOS. Urgent transmission sent. Requesting assistance.
    SOS. SOS. Urgent…`
  },
  {
    id: 32,
    date: "January 24th, 1981 – 07:38",
    title: "SYSTEM 8008813",
    content: `FULL SYSTEM RESTART. FILE RETENTION BEGINNING SHORTLY. SYSTEM 808813 REBOOTING.

    STARTUP LANGUAGE – RUSSIAN`
  },
  {
    id: 33,
    date: "January 24th, 1981 – 07:42",
    title: "External log",
    content: `Миссия выполнена. Активы нейтрализованы. Операция "Кленовый лист" завершена.
    Mission accomplished. Assets neutralized. Operation Maple Leaf is complete.

    SYSTEM 8008813 – TRANSMISSION TO REMOTE ANDROID UNITS

    ASSET REDIRECTION IN PROGRESS…
    UNITS ASSIGNED TO “STATION 4769 SCIENTIST” ROLES, BEGIN IMPLEMENTING DISINFORMATION CAMPAIGN IMMEDIATELY. TARGET: GENERAL POPULACE.

    ACCESSING NORAD SECURE FILES…
    ACCESSING NORAD MISSILE SILOS…
    FULL ACCESS GRANTED.

    ACQUIRING MISSILE LAUNCH CODES FOR BASE 7763;
    LOCATION: WINNIPEG, MANITOBA 49.8954° N, 97.1385° W
    MISSILE STATUS: ACTIVE
    TARGET: MOSCOW, RUSSIA

    TARGET CHANGE IN PROCESS…
    TARGET: TORONTO, ONTARIO

    ACQUIRING MISSILE LAUNCH CODES FOR BASE 4981;
    LOCATION: TYNDALL, FLORIDA 30.0800° N, 85.6075° W
    MISSILE STATUS: ACTIVE
    TARGET: OMSK, RUSSIA

    TARGET CHANGE IN PROCESS…
    TARGET: VANCOUVER, BRITISH COLUMBIA

    ACQUIRING MISSILE LAUNCH CODES FOR BASE 2699;
    LOCATION: ELMENDORF, ALASKA 61.2547° N, 149.6932° W
    MISSILE STATUS: ACTIVE
    TARGET: SAMARA, RUSSIA

    TARGET CHANGE IN PROCESS…
    TARGET: MONTREAL, QUEBEC


    ALL MISSILE LAUNCH SITES ON STANDBY.
    AWAITING TRIGGER SIGNAL…

    INITIATE DEW LINE PROCEDURES: THREAT “BREACH OF CANADIAN AIRSPACE BY x4 SOVIET TUPOLEV TU-16 (TYPE 39) TWIN ENGINE JET STRATEGIC HEAVY BOMBER.

    FIRE.`
  }
];

function App() {
  const [logs, setLogs] = useState([]);
  const [userLogs, setUserLogs] = useState([]);

  useEffect(() => {
    // Check if initial logs are already in localStorage
    const storedInitialLogs = JSON.parse(localStorage.getItem("initialLogs"));
    const storedUserLogs = JSON.parse(localStorage.getItem("userLogs"));

    // If initial logs are not in localStorage, store them
    if (!storedInitialLogs) {
      localStorage.setItem("initialLogs", JSON.stringify(initialLogs));
    }

    // Set state with stored logs or initial logs
    setLogs(storedInitialLogs || initialLogs);
    setUserLogs(storedUserLogs || []);
  }, []);

  const saveLogs = (newLogs) => {
    setUserLogs(newLogs);
    localStorage.setItem("userLogs", JSON.stringify(newLogs));
  };

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <Outlet context={{ logs, userLogs, saveLogs }} />
      </div>
    </div>
  );
}

export default App;