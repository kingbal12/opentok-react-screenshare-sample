import mock from "../mock"
let data = {
  events: [
    {
      id: 1,
      // title: "My Event",
      start: new Date(),
      end: new Date(),
      // label: "business"
      // allDay: true,
      // selectable: true
    },
    // {
    //   id: 2,
    //   // title: "My Event",
    //   start: "2021-04-06 09:30:00",
    //   end: "2021-04-06 09:45:00",
    //   label: "others"
    //   // allDay: false,
    //   // selectable: true
    // },
    // {
    //   id: 2,
    //   // title: "My Event",
    //   start: "2021-04-06 10:15:00",
    //   end: "2021-04-06 10:30:00",
    //   label: "others"
    //   // allDay: false,
    //   // selectable: true
    // },
    // {
    //   id: 2,
    //   // title: "My Event",
    //   start: "2021-04-07 09:45:00",
    //   end: "2021-04-07 10:00:00",
    //   label: "others"
    //   // allDay: false,
    //   // selectable: true
    // },
    // {
    //   id: 2,
    //   // title: "My Event",
    //   start: "2021-04-07 11:00:00",
    //   end: "2021-04-07 11:15:00",
    //   label: "others"
    //   // allDay: false,
    //   // selectable: true
    // },
    // {
    //   id: 2,
    //   // title: "My Event",
    //   start: "2021-04-07 11:45:00",
    //   end: "2021-04-07 12:00:00",
    //   label: "others"
    //   // allDay: false,
    //   // selectable: true
    // },
    // {
    //   id: 2,
    //   // title: "My Event",
    //   start: "2021-04-09 13:00:00",
    //   end: "2021-04-09 13:15:00",
    //   label: "others"
    //   // allDay: false,
    //   // selectable: true
    // },
    // {
    //   id: 2,
    //   // title: "My Event",
    //   start: "2021-04-09 14:15:00",
    //   end: "2021-04-09 14:30:00",
    //   label: "others"
    //   // allDay: false,
    //   // selectable: true
    // },


    // {
    //   id: 2,
    //   // title: "My Event",
    //   start: "2021-04-12 09:00:00",
    //   end: "2021-04-12 09:15:00",
    //   label: "others"
    //   // allDay: false,
    //   // selectable: true
    // },
    // {
    //   id: 2,
    //   // title: "My Event",
    //   start: "2021-04-12 09:15:00",
    //   end: "2021-04-12 09:30:00",
    //   label: "others"
    //   // allDay: false,
    //   // selectable: true
    // },
    // {
    //   id: 2,
    //   // title: "My Event",
    //   start: "2021-04-16 13:30:00",
    //   end: "2021-04-16 13:45:00",
    //   label: "others"
    //   // allDay: false,
    //   // selectable: true
    // },
    // {
    //   id: 2,
    //   // title: "My Event",
    //   start: "2021-04-16 10:45:00",
    //   end: "2021-04-16 11:00:00",
    //   label: "others"
    //   // allDay: false,
    //   // selectable: true
    // },

    // {
    //   id: 2,
    //   // title: "My Event",
    //   start: "2021-04-12 09:00:00",
    //   end: "2021-04-12 15:00:00",
    //   label: "others"
    //   // allDay: false,
    //   // selectable: true
    // },
    // {
    //   id: 2,
    //   // title: "My Event",
    //   start: "2021-04-13 09:00:00",
    //   end: "2021-04-13 12:00:00",
    //   label: "others"
    //   // allDay: false,
    //   // selectable: true
    // },
    // {
    //   id: 2,
    //   // title: "My Event",
    //   start: "2021-04-14 09:00:00",
    //   end: "2021-04-14 12:00:00",
    //   label: "others"
    //   // allDay: false,
    //   // selectable: true
    // },
    // {
    //   id: 2,
    //   // title: "My Event",
    //   start: "2021-04-16 13:00:00",
    //   end: "2021-04-16 18:00:00",
    //   label: "others"
    //   // allDay: false,
    //   // selectable: true
    // },

    // , // 테스트용
    //   {allDay: undefined,
    //   end: "Fri May 28 2021 02:45:00 GMT+0900 (대한민국 표준시)",
    //   id: "0431-0900",
    //   label: "others",
    //   selectable: undefined,
    //   start: "Fri May 28 2021 01:00:00 GMT+0900 (대한민국 표준시)",
    //   title: "테스트"
    //   },
    //   {
    //   allDay: undefined,
    //   end: "Fri May 28 2021 02:15:00 GMT+0900 (대한민국 표준시)",
    //   id: "s12", 
    //   label: "others",
    //   selectable: undefined,
    //   start: "Fri May 28 2021 01:00:00 GMT+0900 (대한민국 표준시)" 
    //   }
  ]
}

// GET : Calendar Events
mock.onGet("/api/apps/calendar/events").reply(() => {
  return [200, data.events]
})
