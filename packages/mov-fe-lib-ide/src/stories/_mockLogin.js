// Please update the access and refresh token before start your developments
export const authParams = {
  mockData: [
    {
      url: "/token-auth/",
      method: "POST",
      status: 200,
      response: _ => {
        // MUST BE A REAL TOKEN FROM MOVAI BE
        return {
          refresh_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJSZWZyZXNoIiwiaXNzIjoiYmFja2VuZCIsImlhdCI6MTY2MTk1MTc1MywiZXhwIjoxNjYyNTU2NTUzLCJqdGkiOiI1MTdjZjA3Ny0xNTFlLTRiZDQtOGI3NS1lMTM1ODEwZGU2NjYiLCJyZWZyZXNoX2lkIjoiIiwiZG9tYWluX25hbWUiOiJpbnRlcm5hbCIsImFjY291bnRfbmFtZSI6Im1vdmFpIiwiY29tbW9uX25hbWUiOiJNb3ZhaSIsInVzZXJfdHlwZSI6IklOVEVSTkFMIiwicm9sZXMiOlsiYWRtaW4iXSwiZW1haWwiOiIiLCJzdXBlcl91c2VyIjp0cnVlLCJyZWFkX29ubHkiOmZhbHNlLCJzZW5kX3JlcG9ydCI6ZmFsc2V9.1wat5SOXpOpoLVZtHY2c9Im_OJ4CIlSH-l6ES0wv06k",
          access_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBY2Nlc3MiLCJpc3MiOiJiYWNrZW5kIiwiaWF0IjoxNjYxOTUxNzUzLCJleHAiOjE2NjE5NTUzNTMsImp0aSI6IjhhYWM3MzBlLTRiZWQtNDJjMS1hYmVlLWQ4MTEzNmQ3ZDQ1MiIsInJlZnJlc2hfaWQiOiI1MTdjZjA3Ny0xNTFlLTRiZDQtOGI3NS1lMTM1ODEwZGU2NjYiLCJkb21haW5fbmFtZSI6ImludGVybmFsIiwiYWNjb3VudF9uYW1lIjoibW92YWkiLCJjb21tb25fbmFtZSI6Ik1vdmFpIiwidXNlcl90eXBlIjoiSU5URVJOQUwiLCJyb2xlcyI6WyJhZG1pbiJdLCJlbWFpbCI6IiIsInN1cGVyX3VzZXIiOnRydWUsInJlYWRfb25seSI6ZmFsc2UsInNlbmRfcmVwb3J0IjpmYWxzZX0.3Jep6gLHddnzihcwSEO3ODEMTcpOm-vHgRKp-l7VTY4",
          error: false
        };
      }
    },
    {
      url: "/token-refresh/",
      method: "POST",
      status: 200,
      response: _ => {
        return {
          access_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBY2Nlc3MiLCJpc3MiOiJiYWNrZW5kIiwiaWF0IjoxNjYxOTQxODgzLCJleHAiOjE2NjE5NDU0ODMsImp0aSI6ImE5ZDZkNWQzLTNhYmYtNGIzZC1iNGRmLTI4ODYzOTdmNWU2ZCIsInJlZnJlc2hfaWQiOiI5MGUzOTk5OC1iMWJjLTQ0YmYtYTQxYS1jOGQ5YTgxOGZjMDUiLCJkb21haW5fbmFtZSI6ImludGVybmFsIiwiYWNjb3VudF9uYW1lIjoibW92YWkiLCJjb21tb25fbmFtZSI6Ik1vdmFpIiwidXNlcl90eXBlIjoiSU5URVJOQUwiLCJyb2xlcyI6WyJhZG1pbiJdLCJlbWFpbCI6IiIsInN1cGVyX3VzZXIiOnRydWUsInJlYWRfb25seSI6ZmFsc2UsInNlbmRfcmVwb3J0IjpmYWxzZX0.F_TsaiYDEyqSVXSej3vUzO9bR_UIDjAQqcN2BuwWzo4"
        };
      }
    },
    {
      url: "/token-verify/",
      method: "POST",
      status: 200,
      response: _ => {
        return {
          result: true
        };
      }
    },
    {
      url: "/domains/",
      method: "GET",
      status: 200,
      response: _ => {
        return {
          domains: ["internal"]
        };
      }
    }
  ]
};
