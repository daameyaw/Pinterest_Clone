export async function getPins() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/?per_page=25&client_id=yLNUmzJFwd77yleiSU9sIj78fRAb7GyrAF2p1pCh80w`
    );
    const data = await response.json();

    // console.log("Fetched pins:", data);
    if (data.length === 0) {
      throw new Error("No pins found");
    }
    if (data.length === 0) {
      return;
    }

    if (data) {
      const formattedData = data.map((photo, index) => {
        const descriptionWords = photo.description?.split(" ");
        const firstTwoWords = descriptionWords?.slice(0, 2)?.join(" ");

        const ownerName = photo.user.name?.split(" ");
        const firstName = ownerName?.slice(0, 1);

        return {
          id: photo.id,
          likes: `${Math.round(Math.random() * 20) + 1}`,
          title: firstTwoWords || "",
          owner: firstName || "",
          ownerImage: photo.user.profile_image.small,
          image: photo.urls.regular,
          followers: `${Math.round(Math.random() * 100) + 1}K`,
          // comments: `${Math.round(Math.random() * 100) + 1}`,
          link: photo.links.html,
          comments: [],
        };
      });
      // console.log(formattedData);
      return formattedData;
    } else {
      throw new Error("No data received from the API");
    }
  } catch (error) {
    throw new Error(`Failed to fetch pins: ${error.message}`);
  }
}

export async function getRandoms() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random/?count=14&client_id=yLNUmzJFwd77yleiSU9sIj78fRAb7GyrAF2p1pCh80w`
    );
    const data = await response.json();

    // console.log("Fetched pins:", data);
    if (data) {
      const formattedData = data.map((photo) => {
        const descriptionWords = photo.description?.split(" ");
        const firstTwoWords = descriptionWords?.slice(0, 2)?.join(" ");

        const ownerName = photo.user.name?.split(" ");
        const firstName = ownerName?.slice(0, 1);

        return {
          id: photo.id,
          likes: photo.likes,
          title: firstTwoWords || "",
          owner: firstName || "",
          ownerImage: photo.user.profile_image.small,
          image: photo.urls.regular,
          followers: `${Math.round(Math.random() * 100) + 1}K`,
          // comments: `${Math.round(Math.random() * 100) + 1}`,
          comments: [],
        };
      });
      console.log(formattedData);
      return formattedData;
    } else {
      throw new Error("No data received from the API");
    }
  } catch (error) {
    throw new Error(`Failed to fetch pins: ${error.message}`);
  }
}

// const accessKey = "YOUR_ACCESS_KEY"; // Replace with your actual access key

export async function getSearch(query) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/collections?query=${query}&per_page=1&client_id=yLNUmzJFwd77yleiSU9sIj78fRAb7GyrAF2p1pCh80w`
    );
    const result = await response.json();
    // console.log(result.results[0].cover_photo.asset_type);
    const data = result.results; // The search endpoint nests results in a `results` array

    if (data) {
      const formattedData = data.map((photo, index) => {
        // console.log(photo);
        const descriptionWords = photo.cover_photo.description?.split(" ");
        const firstTwoWords = photo.descriptionWords?.slice(0, 2)?.join(" ");
        const ownerName = photo.cover_photo.user.name?.split(" ");
        const firstName = photo.ownerName?.slice(0, 1);
        return {
          id: photo.id,
          likes: `${Math.round(Math.random() * 20) + 1}`,

          // likes: photo.cover_photo.likes,
          title: photo.user.title || "",
          owner: photo.user.username,
          ownerImage: photo.user.profile_image.small,
          image: photo.cover_photo.urls.regular,
          // followers: `${Math.round(Math.random() * 100) + 1}K`,
          // comments: `${Math.round(Math.random() * 100) + 1}`,
          comments: [],
        };
      });

      console.log(formattedData);
      // return formattedData;
    }
  } catch (error) {
    throw new Error(`Failed to fetch pins: ${error.message}`);
  }
}
