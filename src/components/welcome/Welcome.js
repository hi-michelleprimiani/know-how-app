import "./Welcome.css";

export const Welcome = () => {
  return (
    <>
      <div className="welcome-container">
        <h1 className="welcome-title">Know-How!</h1>
        <div className="welcome-tagline">For Outdoor Lovers</div>
        <br></br>
        <div className="welcome-about">
          Know-How is an organization curating events and classes for outdoors
          lovers and the outdoors curious. The website curates experiences
          designed to connect participants back to nature and build community
          through a shared love of the outdoors. This application merges the
          healing power of nature with education. Know-How offers weekly
          workshops and activities to anyone interested in the outdoors,
          regardless of experience. For those who may want to start a new
          outdoor hobby but aren’t sure how, Know-How provides an inclusive
          environment for learning and adventuring.
        </div>
      </div>
    </>
  );
};
