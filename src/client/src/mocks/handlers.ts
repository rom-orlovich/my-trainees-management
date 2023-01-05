import { rest } from "msw";
import { API_ROUTES } from "../tsx/redux/api/apiRoutes";

export const handlers = [
  rest.get(
    `*${API_ROUTES.API_AUTH_ROUTE}${API_ROUTES.REFRESH_TOKEN_ROUTE}`,
    (req, res, ctx) => {
      const refreshToken = req.cookies.refresh_token;
      if (refreshToken) return res(ctx.status(201), ctx.json({ user: "2" }));

      return res(ctx.status(403), ctx.json({ user: "2" }));
    }
  ),
  rest.post(
    `*${API_ROUTES.API_AUTH_ROUTE}${API_ROUTES.LOGIN_ROUTE}`,
    (req, res, ctx) =>
      res(
        ctx.status(201),
        ctx.json({
          statusCode: 201,
          message: "Login is success!",
          user: {
            user_id: 2,
            role: "trainer",
            username: "trainer123",
            verify_token: null,
            profile_id: 2,
            trainee_id: null,
            trainer_user_id: null,
          },
          accessToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lciIsInVzZXJfaWQiOjIsInVzZXJuYW1lIjoidHJhaW5lcjEyMyIsImlhdCI6MTY3Mjk0NDM3MSwiZXhwIjoxNjcyOTQ1MjcxfQ.iUUtjNGtQPT49lVb-pehLTKvmSnH5o-XeP2w851-Yzo",
        })
      )
  ),

  rest.get(`*${API_ROUTES.ALERTS_ROUTE}`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            alert_id: 228,
            alert_date: "2023-01-05T18:46:11.841Z",
            alert_message: "Login is success!",
            user_id: 2,
          },
          {
            alert_id: 227,
            alert_date: "2023-01-04T09:13:59.452Z",
            alert_message: "Login is success!",
            user_id: 2,
          },
          {
            alert_id: 226,
            alert_date: "2023-01-03T16:22:43.857Z",
            alert_message: "The measure  was created successfully!",
            user_id: 2,
          },
        ],
        next: false,
        countRows: 3,
      })
    )
  ),

  rest.get(`*${API_ROUTES.TRAINEES_ROUTE}`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            trainee_id: 1,
            user_id: 3,
            trainer_user_id: 2,
            profile_id: 3,
            first_name: "rom",
            last_name: "orlovich",
            gender: "male",
            identify_num: 222222,
            birthday: "1997-07-27T21:00:00.000Z",
            email: "rom-orlovich@cyber4s.dev",
            phone_number: "054-3552144",
            location_id: 1,
            date_join: "2022-10-14T21:00:00.000Z",
            status: true,
            measure_id: null,
            street: "Moshe Hass",
            city_name: "Kiryat Ono",
            username: "trainee123",
          },
          {
            trainee_id: 2,
            user_id: null,
            trainer_user_id: 2,
            profile_id: 4,
            first_name: "Ido",
            last_name: "Gideon",
            gender: "male",
            identify_num: 920213,
            birthday: "1995-10-10T22:00:00.000Z",
            email: "glind57@pickuplanet.com",
            phone_number: "054-617-4272",
            location_id: 7,
            date_join: "2022-10-24T21:00:00.000Z",
            status: false,
            measure_id: null,
            street: "39 Levinsky",
            city_name: "Tel Aviv",
            username: null,
          },
          {
            trainee_id: 3,
            user_id: null,
            trainer_user_id: 2,
            profile_id: 5,
            first_name: "Nitza",
            last_name: "Meira",
            gender: "female",
            identify_num: 488554,
            birthday: "1965-10-08T21:00:00.000Z",
            email: "czena1@chantellegribbon.com",
            phone_number: "054-245-5250",
            location_id: 2,
            date_join: "2022-10-24T21:00:00.000Z",
            status: false,
            measure_id: null,
            street: "R.s",
            city_name: "Tel Aviv",
            username: null,
          },
          {
            trainee_id: 4,
            user_id: null,
            trainer_user_id: 2,
            profile_id: 6,
            first_name: "Tzvi",
            last_name: "Daniela",
            gender: "male",
            identify_num: 3851455,
            birthday: "1972-09-30T21:00:00.000Z",
            email: "ninchu@grecc.me",
            phone_number: "055-011-9485",
            location_id: 7,
            date_join: "2022-10-24T21:00:00.000Z",
            status: false,
            measure_id: null,
            street: "39 Levinsky",
            city_name: "Tel Aviv",
            username: null,
          },
          {
            trainee_id: 5,
            user_id: 4,
            trainer_user_id: 2,
            profile_id: 7,
            first_name: "rom2",
            last_name: "rom2",
            gender: "male",
            identify_num: 222222,
            birthday: "2009-12-02T22:00:00.000Z",
            email: "madman280797@gmail.com",
            phone_number: "0543552144",
            location_id: 3,
            date_join: "2022-12-23T22:00:00.000Z",
            status: true,
            measure_id: null,
            street: "Ben Gurion",
            city_name: "Ramat Gan",
            username: "rom12345",
          },
        ],
        next: false,
        countRows: 5,
        stats: {
          graphStats: {},
        },
      })
    )
  ),
];
