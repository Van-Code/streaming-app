export const authToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWFiNDkyMDJiOTlmNzg2MjY1ZWE2ZjJjMTIyNzFlZCIsInN1YiI6IjY1OGEzZDNjZTI5NWI0MTBiYTU4MWM3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rhU43QSFIzMk9HKr6FOjPTjVKb94LlcNGJSRHDh1Vto";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${authToken}`,
  },
};
