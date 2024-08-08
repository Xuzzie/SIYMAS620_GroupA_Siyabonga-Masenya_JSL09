/**
 * Challenge: get a random image from Unsplash and set it as the background
 *
 * Part 1:
 *
 * URL: https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature
 * (You can change the "query" at the end to whatever theme you want)
 *
 * Change the body's backgroundImage to:
 * `url(<insert the URL of the iamge from the API here>)`
 *
 * (You may need to dig around the response body a bit to find this URL)
 *
 * (Note I've already added some CSS to resize the image within the window.
 * Instructions for this were found on CSS Tricks:
 * https://css-tricks.com/perfect-full-page-background-image/#awesome-easy-progressive-css3-way)
 */

fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    //console.log(data);
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    /**
     * Challenge part 2: Display the image's author
     *
     * With the data you've already fetched, display the name of the
     * image author on the page. They show up as the "user" in the data
     * returned from the API.
     *
     * Don't worry about positioning the author in the lower-left yet.
     */
    document.getElementById(
      "authorsName"
    ).textContent = `By: ${data.user.name}`;
  })
  .catch((err) => {
    // Use a default background image/author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`;
    document.getElementById("author").textContent = `By: Dodi Achmad`;
  });

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    document.getElementById("crypto").innerHTML = `
        <img src=${data.image.small} />
        <span>${data.name}</span>
    `;

    document.getElementById("crypto").innerHTML += `
    <p>🎯: $${data.market_data.current_price.usd}</p>
    <p>👆: $${data.market_data.high_24h.usd}</p>
    <p>👇: $${data.market_data.low_24h.usd}</p>
`;
  })

  /**
   * Challenge: Pull down the cryptocurrency data for dogecoin from the
   * CoinGecko API and log it to the console
   *
   * Also add a .catch() method to console any errors that might occur to the console
   */

  .catch((err) => console.error(err));

const date = new Date();
document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {
  timeStyle: "short",
});

function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    { timeStyle: "short" }
  );
}

setInterval(getCurrentTime, 1000);

// This section confused me and troubled me a bit.

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      // console.log(data)
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("weather").innerHTML = `
              <img src=${iconUrl} />
          `;
      document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p>${Math.round(data.main.temp)}º</p>
                <p>${data.name}</p>
            `;
    })
    .catch((err) => console.error(err));
});
