import { ApplicationStatus, PrismaClient } from "@prisma/client"
import { hashPassword } from "../utils/hash"

const prisma = new PrismaClient()
enum TagType {
  Performer = "performer",
  Event = "event",
}
enum Status {
  completed = "completed",
  expired = "expired",
  valid = "valid",
}

enum Properties {
  public = "public",
  private = "private",
}
async function main() {
  await prisma.eventsHashtag.deleteMany()
  await prisma.performersHashtag.deleteMany()
  await prisma.hashtagDetail.deleteMany()
  await prisma.event.deleteMany()
  await prisma.hashtagDetail.deleteMany()
  await prisma.client.deleteMany()
  await prisma.eprofile.deleteMany()
  await prisma.performer.deleteMany()
  await prisma.user.deleteMany()

  await prisma.user.createMany({
    data: [
      {
        uuid: "c48df332-662b-499b-a57f-44e9c0fdd6e2",
        username: "ken",
        password: await hashPassword("1234"),
        email: "ken@gmail.com",
        identity: "performer",
        icon: "icon3.jpeg",
      },

      {
        uuid: "56bee6df-80c0-4d80-9c68-fd407f27ba2a",
        username: "maple",
        password: await hashPassword("1234"),
        email: "maple@gmail.com",
        identity: "performer",
        icon: "icon1.jpeg",
      },
      {
        uuid: "e9c678ff-2d43-46c0-a6d2-40e15d3d6192",
        username: "scarlett",
        password: await hashPassword("1234"),
        email: "scarlett@gmail.com",
        identity: "performer",
        icon: "icon1.jpeg",
      },

      {
        uuid: "568e9b4c-45f2-4270-ac60-c34fe3468509",
        username: "mei",
        password: await hashPassword("1234"),
        email: "may@gmail.com",
        identity: "performer",
        icon: "icon8.jpeg",
      },
      {
        uuid: "c66e63cb-3a2e-4b6d-b73a-94e7cd4d53ff",
        username: "Cary",
        password: await hashPassword("jLroTI"),
        email: "chumphrey4@oakley.com",
        identity: "performer",
        icon: "icon1.jpeg",
      },
      {
        uuid: "751ef13c-d455-43d1-9171-9fd8f5d86ead",
        username: "Elane",
        password: await hashPassword("yWsUSw9aEQHV"),
        email: "edavydochkin5@studiopress.com",
        identity: "performer",
        icon: "picture.png",
      },
      {
        uuid: "041a03d8-88a6-4bfc-ab1f-76a84addf89a",
        username: "Andee",
        password: await hashPassword("EN3rVcnG2Qoi"),
        email: "asowter6@scribd.com",
        identity: "client",
        icon: "picture.png",
      },
      {
        uuid: "e0cbf849-dbf2-44f0-8c69-8a179b9a1e72",
        username: "Alphonso",
        password: await hashPassword("XuZ5BzGkN"),
        email: "akleinert7@acquirethisname.com",
        identity: "client",
        icon: "icon8.jpeg",
      },
      {
        uuid: "1994e9df-a553-4784-8cbc-52f0eaab466e",
        username: "Ailyn",
        password: await hashPassword("V6kus9NlrX3x"),
        email: "ahaldenby8@vimeo.com",
        identity: "client",
        icon: "picture.png",
      },
      {
        uuid: "54d1e24a-c6a6-4d5b-a23d-a83ae27957a6",
        username: "Jori",
        password: await hashPassword("7nuNN8SJD"),
        email: "jismay9@reference.com",
        identity: "client",
        icon: "myicon.png",
      },
    ],
  })

  ////////////////////////////////////performers (350) start/////////////////////////////////////////////////////

  await prisma.performer.createMany({
    data: [
      {
        users_id: 1,
        years_of_exp: 5,
        birthday: new Date("1997-07-16"),
        contact_number: 12341234,
        contact_email: "performer@gmail.com",
        gender: "male",
      },
      {
        users_id: 2,
        years_of_exp: 5,
        birthday: new Date("1998-08-20"),
        contact_number: 43214321,
        contact_email: "performer2@gmail.com",
        gender: "female",
      },
      {
        users_id: 3,
        years_of_exp: 0,
        birthday: new Date("1970-02-20"),
        contact_number: 43214321,
        contact_email: "performer3@gmail.com",
        gender: "other",
      },
      {
        users_id: 4,
        years_of_exp: 0,
        birthday: new Date("2000-07-16"),
        contact_number: 43214321,
        contact_email: "performer3@gmail.com",
        gender: "other",
      },
      {
        users_id: 5,
        years_of_exp: 0,
        birthday: new Date("1998-01-16"),
        contact_number: 43214321,
        contact_email: "performer3@gmail.com",
        gender: "other",
      },
      {
        users_id: 6,
        years_of_exp: 0,
        birthday: new Date("1999-07-01"),
        contact_number: 43214321,
        contact_email: "performer3@gmail.com",
        gender: "other",
      },
    ],
  })

  ////////////////////////////////////  e_profile (210/350) starts/////////////////////////////////////////////////////////

  const fakeEPorfile = `{
    "header": {
      "iconPosition": "left",
      "iconName": "Rick_Astley_Dallas.jpg",
      "backgroundImage": "default",
      "colorStyle": "black",
      "displayTab": "about",
      "userName": "Rick Astley",
      "title": "pop dancer",
      "introduction": "Hi I am Rick Astley",
      "contactNumber": "12345678",
      "contactEmail": "RickAstley@email.com"
    },
    "page": [
      {
        "page": 1,
        "pageTitle": "About me",
        "pageName": "SelfIntroducePage",
        "style": "textAndVideo",
        "mainColor": "black",
        "contentsOrMedia": [
          {
            "id": 1,
            "type": "video",
            "content1": "Never Gonna Give You Up",
            "content2": "Hi I am Rick Astley. This is Never Gonna Give You Up (Official Music Video)",
            "content3": "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
          },
          {
            "id": 2,
            "type": "text",
            "content1": "",
            "content2": "I am an English singer, songwriter and radio personality.",
            "content3": ""
          }
        ]
      },
      {
        "page": 2,
        "pageTitle": "Time Line",
        "pageName": "TimeLinePage",
        "style": "left",
        "mainColor": "black",
        "contentsOrMedia": [
          {
            "id": 1,
            "type": "text",
            "content1": "Signing with Stock Aitken Waterman",
            "content2": "In 1985, Astley was performing as a drummer with a soul band named FBI, with Morris on guitar. They were a well-known local band writing and performing their own music, gigging in pubs and clubs.",
            "content3": ""
          },
          {
            "id": 2,
            "type": "video",
            "content1": "Never Gonna Give You Up",
            "content2": "原唱 at 1987/7/27/",
            "content3": "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
          },
          {
            "id": 3,
            "type": "image",
            "content1": "Retirement and Return to singing ",
            "content2": "1994 to 2000 was Retirement and in 2000 to present , He was returned to the music industry",
            "content3": "Rick_Astley_image5.jpg"
          },
          {
            "id": 4,
            "type": "video",
            "content1": "Never Gonna Give You Up (粤語)",
            "content2": "粤语改編 at 2021/7/27",
            "content3": "https://www.youtube.com/watch?v=ZhnjLj2Ou90&ab_channel=B%E7%AB%99%E9%95%BF"
          },
          {
            "id": 5,
            "type": "video",
            "content1": "Never Gonna Give You Up (國語)",
            "content2": "國語改編 at 2022/2/19",
            "content3": "https://www.youtube.com/watch?v=vnIGrETLFKg&ab_channel=%E7%B4%94%E6%83%85%E5%B0%8F%E4%B8%AD%E6%9D%91NakamuraC"
          }
        ]
      },
      {
        "page": 3,
        "pageTitle": "Albums",
        "pageName": "AlbumsPage",
        "style": "style1",
        "mainColor": "black",
        "contentsOrMedia": [
          {
            "id": 1,
            "type": "image",
            "content1": "",
            "content2": "",
            "content3": "Rick_Astley_image1.jpg"
          },
          {
            "id": 2,
            "type": "image",
            "content1": "",
            "content2": "",
            "content3": "Rick_Astley_image2.jpg"
          },
          {
            "id": 3,
            "type": "image",
            "content1": "",
            "content2": "",
            "content3": "Rick_Astley_image3.jpg"
          },
          {
            "id": 4,
            "type": "image",
            "content1": "",
            "content2": "",
            "content3": "Rick_Astley_image4.jpg"
          }
        ]
      }
    ]
  }`
  await prisma.eprofile.createMany({
    data: [
      {
        performers_id: 1,
        content: fakeEPorfile,
      },
      {
        performers_id: 2,
        content: fakeEPorfile,
      },
      {
        performers_id: 3,
        content: fakeEPorfile,
      },

      {
        performers_id: 4,
        content: fakeEPorfile,
      },
    ],
  })

  /////////////////////////////////////////////client (650) starts///////////////////////////////////

  await prisma.client.createMany({
    data: [
      {
        users_id: 7,
        name: "scarlett",
        contact_number: 12341234,
        client_type: "individual",
      },
      {
        users_id: 8,
        name: "May Co.",
        contact_number: 12341234,
        client_type: "individual",
      },
      {
        users_id: 9,
        name: "Peter Ltd.",
        contact_number: 12341234,
        client_type: "corporate",
      },
      {
        users_id: 10,
        name: "Good Good co.",
        contact_number: 12341234,
        client_type: "corporate",
      },
    ],
  })

  ///////////////////////////////hashtagDetail (perf: 24; event: 11) starts/////////////////////////////////////////////////

  await prisma.hashtagDetail.createMany({
    data: [
      {
        name: "Singer",
        tag_type: TagType.Performer,
      },
      {
        name: "DJ",
        tag_type: TagType.Performer,
      },
      {
        name: "Musician",
        tag_type: TagType.Performer,
      },
      {
        name: "Juggling",
        tag_type: TagType.Performer,
      },
      {
        name: "Dancer",
        tag_type: TagType.Performer,
      },
      {
        name: "Mime",
        tag_type: TagType.Performer,
      },
      {
        name: "Emcee(MC)",
        tag_type: TagType.Performer,
      },
      {
        name: "Comedian",
        tag_type: TagType.Performer,
      },
      {
        name: "Clowning",
        tag_type: TagType.Performer,
      },
      {
        name: "Fire Dancer",
        tag_type: TagType.Performer,
      },
      {
        name: "Fire Breather",
        tag_type: TagType.Performer,
      },
      {
        name: "Aerial and Acrobatic Performer",
        tag_type: TagType.Performer,
      },
      {
        name: "Burlesque",
        tag_type: TagType.Performer,
      },
      {
        name: "Drawer",
        tag_type: TagType.Performer,
      },
      {
        name: "Balloon Twister",
        tag_type: TagType.Performer,
      },
      {
        name: "Performance Artist",
        tag_type: TagType.Performer,
      },
      {
        name: "Sketchers",
        tag_type: TagType.Performer,
      },
      {
        name: "Graffiti Artist",
        tag_type: TagType.Performer,
      },
      {
        name: "Acapello",
        tag_type: TagType.Performer,
      },
      {
        name: "Beatboxer",
        tag_type: TagType.Performer,
      },
      {
        name: "Puppetry",
        tag_type: TagType.Performer,
      },
      {
        name: "Rapper",
        tag_type: TagType.Performer,
      },
      {
        name: "Lion Dance",
        tag_type: TagType.Performer,
      },
      {
        name: "Others",
        tag_type: TagType.Performer,
      },
      {
        name: "Charity Event",
        tag_type: TagType.Event,
      },
      {
        name: "Internal Corporate Event",
        tag_type: TagType.Event,
      },
      {
        name: "Annual Dinner",
        tag_type: TagType.Event,
      },
      {
        name: "Concert",
        tag_type: TagType.Event,
      },
      {
        name: "Party",
        tag_type: TagType.Event,
      },
      {
        name: "Carnival",
        tag_type: TagType.Event,
      },
      {
        name: "Wedding",
        tag_type: TagType.Event,
      },
      {
        name: "Celebration",
        tag_type: TagType.Event,
      },
      {
        name: "Luncheon",
        tag_type: TagType.Event,
      },
      {
        name: "Ceremony",
        tag_type: TagType.Event,
      },
      {
        name: "Others",
        tag_type: TagType.Event,
      },
    ],
  })
  ///////////////////////////////////// performersHashtag (701) starts//////////////////////////////////

  const userId = await prisma.user.findMany({
    select: {
      id: true,

      performers: { select: { id: true }},
      clients: { select: { id: true } },
    },
  })

  const eventId = await prisma.event.findMany({
    select: {
      id: true,
      // events_hashtags: {
      //   select: { id: true, hashtag_details: { select: { id: true } } },
      // },
    },
  })

  const hashtagDetailId = await prisma.hashtagDetail.findMany({
    select: { 
      id: true,
      performers_hashtags: {select: { id: true, performers: {select: {id: true}}}},
      events_hashtags: {select: {id: true, events: {select: {id: true}}}}
    }, 

  })



  const userUuid = await prisma.user.findMany({
    select: { 
      uuid: true,
    }, 

  })











  await prisma.performersHashtag.createMany({
    data: [
      {
        performers_id: userId[0].performers[0].id,
        hashtag_details_id: hashtagDetailId[0].performers_hashtags[0].id
          
      },
    ],
  })



  //////////////////////////////////event (1000) starts////////////////////////////////////////////

  await prisma.event.createMany({
    data: [
      {
        performers_id: userId[0].performers[0].id,
        clients_id: userId[8].clients[0].id,
        title: "Wedding",
        wage_offer: 8888,
        start_date: new Date("2023-10-10"),
        end_date: new Date("2023-10-10"),
        rehearsal_needed: false,
        start_time: new Date("15:30:00"),
        end_time: new Date("19:30:00"),
        image: "venue3.jpeg",
        description: "MC need!!!!! 求婚宴司儀，婚禮司儀!!!",
        location: "Causeway Bay",
        status: Status.valid,
        properties: Properties.public,
        is_shown: true,
        date_published: new Date("2023-3-15"),
      },
      {
        performers_id: userId[1].performers[0].id,
        clients_id: userId[11].clients[0].id,
        title: "百日宴",
        wage_offer: 8888,
        start_date: new Date("2023-12-12"),
        end_date: new Date("2023-12-12"),
        rehearsal_needed: false,
        start_time: new Date("10:30:00"),
        end_time: new Date("13:30:00"),
        image: "venue1.jpeg",
        description: "魔術表演 小朋友魔術!!!",
        location: "Tsim Sha Tsui",
        status: Status.valid,
        properties: Properties.public,
        is_shown: true,
        date_published: new Date("2023-3-10"),
      },
      {
        performers_id: userId[1].performers[0].id,
        clients_id: userId[9].clients[0].id,
        title: "生日會",
        wage_offer: 4800,
        start_date: new Date("2023-09-01"),
        end_date: new Date("2023-09-01"),
        rehearsal_needed: false,
        start_time: new Date("12:30:00"),
        end_time: new Date("15:30:00"),
        image: "venue2.jpeg",
        description: "音樂、舞蹈及劇場表演",
        location: "YuenLong",
        status: Status.valid,
        properties: Properties.public,
        is_shown: true,
        date_published: new Date("2023-3-10"),
      },
    ],
  })

  //////////////////////// events_application (700) starts///////////////////////////////////

  await prisma.eventsApplication.createMany({
    data: [
      {
        events_id: eventId[0].id,
        performers_id: userId[0].performers[0].id,
        status: ApplicationStatus.pending,
      },
      {
        events_id: eventId[1].id,
        performers_id: userId[2].performers[1].id,
        status: ApplicationStatus.accept,
      },

      {
        events_id: eventId[2].id,
        performers_id: userId[3].performers[2].id,
        status: ApplicationStatus.pending,
      },
    ],
  })

  /////////////////////////// EventsHashtag (1000 -- aline with event's qty) starts /////////////////////////

  await prisma.eventsHashtag.createMany({
    data: [
      {
        events_id: eventId[0].id,
        hashtag_details_id: hashtagDetailId[0].events_hashtags[0].id
      },
    ],
  })

  ///////////////////////////////////////////visits_client_1 (1000/2000/5000) starts///////////////////////////////////////

  await prisma.visits.createMany({
    data: [
{
      user_uuid: userUuid[0].uuid,
      device: 'phone',
      ip_address: '192.0.2.1'

},
  {user_uuid: userUuid[3].uuid,
  device: 'web',
  ip_address: '192.0.2.5'

},
    ],
  })

  //////////////////////////////////user_like_client_to_performer (250)  starts ///////////////////////////////////

  await prisma.userLike.createMany({
    data: [{
      subject_uuid: userUuid[0].uuid,
      target_uuid: userUuid[0].uuid
    }],
  })

  ///////////////////////// /review (400) starts ///////////////////////////
  await prisma.review.createMany({
    data: [{
      events_id: eventId[0].id,
      users_id: userId[0].id,
      comments_content: 'Good show',
      score: 4
}

    ],
  })
}

////start here ken

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    await prisma.$disconnect()
    process.exit(1)
  })
