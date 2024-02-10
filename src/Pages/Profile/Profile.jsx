import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Profile() {
  const { user } = useParams();
  const [userData] = useState(JSON.parse(localStorage.getItem("user-data")));

  const [reposData, setReposData] = useState([]);

  console.log(reposData);
  console.log(userData);

  const updatedCalcDays = (time) => {
    const today = new Date().getTime();
    const reposDate = new Date(time).getTime();
    const dateSum = today - reposDate;
    const days = dateSum / 86400000;
    // console.log(today);
    return Math.round(days);
  };

  useEffect(() => {
    const searchUserRepos = async (user) => {
      try {
        const request = await fetch(
          `https://api.github.com/users/${user}/repos`
        );
        const response = await request.json();
        const moreStars = response.sort(
          (a, b) => b.stargazers_count - a.stargazers_count
        );
        setReposData(moreStars);
      } catch (error) {
        console.error(error);
      }
    };

    searchUserRepos(user);
  }, [user]);

  return (
    <div className="prof-desc-container d-lg-flex">
      <aside className="aside-container col-lg-5 col-xl-4">
        <div className="d-flex flex-column col-md-6 col-lg-12 p-lg-4">
          <div className="p-3 p-md-0 m-md-2">
            <img
              src={userData.avatar_url}
              alt={userData.avatar_html}
              className="img-fluid w-100 "
            />
          </div>

          <div className="px-3 ">
            <h3>{userData?.name}</h3>
            <h4>@{userData?.login}</h4>
          </div>
        </div>
        <div>
          <div className="d-flex flex-column-reverse flex-lg-column ">
            <div className="lorem px-3">
              <p>{userData.bio}</p>
            </div>
            <div className="d-flex flex-column m-3  flex-md-row  ">
              <div className="mb-2 d-md-flex align-items-md-center ">
                <i className="fa-solid fa-people-group pe-2 fs-3 icon" />
                <span className="mx-4 mx-xl-2"> {userData?.followers} followers</span>
              </div>
              <div className="mb-2 d-md-flex align-items-md-center">
                <i className="fa-regular fa-heart pe-2 fs-3 icon" />
                <span className="mx-4 mx-xl-2">{userData.following} following</span>
              </div>
              <div className="mb-2 d-md-flex align-items-md-center">
                <i className="fa-regular fa-star pe-2 fs-3 icon" />
                <span className="mx-4 mx-xl-2">{userData?.public_gists} stars</span>
              </div>
            </div>

            <ul className="list-unstyled m-3 mt-4 d-flex flex-column ">
              <li className="mb-2">
                <i className="fa-regular fa-building fs-3 icon" />
                <span className="ms-3">
                  {userData?.company !== null
                    ? userData.company
                    : "No company detailed"}
                </span>
              </li>
              <li className="mb-2 ">
                <i className="fa-regular fa-map fs-3 icon" />
                <span className="ms-3">
                  {userData?.location !== null
                    ? userData.location
                    : "No Location detailed"}
                </span>
              </li>
              <li className="mb-2">
                <i className="fa-regular fa-envelope fs-3 icon " />
                <span className="ms-3">
                  {userData?.email !== null
                    ? userData.email
                    : "No email detailed"}
                </span>
              </li>
              <li className="mb-2">
                <i className="fa-solid fa-link fs-3 icon" />
                <span className="ms-3">
                  {userData?.blog !== ""
                    ? userData.blog
                    : "No web page detailed"}
                </span>
              </li>
              <li className="mb-2">
                <i className="fa-brands fa-twitter fs-3 icon" />
                <span className="ms-3">
                  {userData?.twitter_username !== null
                    ? userData.twitter_username
                    : "No  Twitter detailed"}
                </span>
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-center mt-5 pb-5">
            <Link to={"/"} className="btn-back">
              Back
            </Link>
          </div>
        </div>
      </aside>
      <section className="repos-container my-4 mx-3 ">
        <h1 className="mt-3 text-center ">Repositories</h1>

        {reposData.map((repo) => {
          return (
            <div key={repo.id} className=" d-flex flex-column">
              <h3 className="">
                {repo.name}
                <a
                  href={`https://github.com/${user}/${repo.name}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa-brands fa-github ms-2 lorem" />
                </a>
              </h3>
              <p>{repo.description}</p>
              <div>
                <div className="d-flex align-items-center">
                  <i className="fa-regular fa-star" />

                  <span className="ms-2 ">{repo.stargazers_count} stars</span>
                  <div className="d-flex justify-content-center p-0 m-0">
                    <span className="span-circle mx-2" />
                  </div>
                  <span>
                    updated {updatedCalcDays(repo.updated_at)} days ago
                  </span>
                </div>
              </div>
              <span className="span mt-4" />
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Profile;
