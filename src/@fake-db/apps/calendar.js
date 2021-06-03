import mock from "../mock"
let data = {
  events: [
    {
      id: 1,
      // title: "My Event",
      start: new Date(),
      end: new Date(),
      // label: "business",
      // allDay: true,
      // selectable: true
    },
    {
      id: 2,
      // title: "My Event",
      start: "2021-05-31 00:00:00",
      end: "2021-05-31 01:00:00",
      // label: "business",
      // allDay: false,
      // selectable: true
    }

    // , // 테스트용
    //   {allDay: undefined,
    //   end: "Fri May 28 2021 02:45:00 GMT+0900 (대한민국 표준시)",
    //   id: "0531-0900",
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
