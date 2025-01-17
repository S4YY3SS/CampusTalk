import { useEffect, useState } from "react";
import hat from "../assets/graduate.png";
import GoogleButton from "react-google-button";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import GoogleLogin from "react-google-login";

// TODO : fix text issues
// Add a dummy page for redirect

function Auth({ type, setUser, ...props }) {
  const [active, setActive] = useState(type);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState(0);

  useEffect(() => {
    let newTitle =
      active === "login" ? "Login | CampusTalk" : "Sign Up | CampusTalk";
    document.title = newTitle || "Sign in | CampusTalk";
  }, [active]);

  const toggleActive = () => {
    active === "login" ? setActive("signup") : setActive("login");
  };

  const handleLogin = async (googleData) => {
    const body = JSON.stringify({
      token: googleData.tokenId,
    });

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("/api/users/google", body, headers)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data.user);
        props.history.push("/");
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setError(err.response.data.message);
        } else {
          console.error(err);
          console.log(err.response);
        }
      });
  };

  const loginHandler = () => {
    axios
      .post("/api/users/login", { email, password })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data.user);
        props.history.push("/");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setError(err.response.data.message);
          setStatus(401);
        } else {
          console.error(err);
        }
      });
  };

  const signupHandler = () => {
    axios
      .post("/api/users/signup", {
        email,
        password,
        confirmPassword,
      })
      .then(() => {
        props.history.push("/");
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          setError(err.response.data.error);
          setStatus(409);
        } else if (err.response?.status === 401) {
          setError(err.response.data.error);
          setStatus(401);
        } else {
          console.error(err);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (active === "login") {
      loginHandler();
    } else {
      signupHandler();
    }
  };

  return (
    <div className="w-full bg-bubble flex relative flex-col items-center">
      {/* title */}
      <svg
        width="250"
        height="100"
        viewBox="0 0 220 52"
        className="mr-6 md:mt-3 w-1/2 md:w-auto 2xl:w-full 2xl:mt-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.1828 8.74752L0.656006 16.4891L8.65998 20.5129L16.6202 24.493V22.7873V21.0378L21.7813 18.3261C24.5805 16.839 27.6421 14.827 28.5168 13.9086C29.4353 12.9901 30.5288 12.2465 30.9661 12.2465C34.159 12.2465 36.3459 14.9145 35.4274 17.7575C34.9025 19.332 33.153 20.5567 31.4473 20.5567C30.9661 20.5567 28.7793 21.4752 26.6361 22.6123C22.9622 24.5805 22.7435 24.7992 22.7435 26.1113C22.7435 27.4672 22.9184 27.6422 27.1172 29.7416L31.491 31.9284L47.0178 24.1869L62.5447 16.4016L47.1053 8.70378L31.7097 0.962233L16.1828 8.74752Z"
          fill="#0278E4"
        />
        <path
          d="M29.6977 15.2644C29.1291 16.0517 26.636 17.67 23.5744 19.332L18.3696 22.0875V36.8271V51.6104H19.6818H20.9939V37.6581V23.662L25.4989 21.169C28.3855 19.5507 30.3975 18.7197 31.2285 18.7634C32.6718 18.8509 34.1152 17.7575 34.1152 16.5328C34.1152 15.4831 32.5843 13.996 31.4909 13.996C31.0098 13.996 30.2225 14.5646 29.6977 15.2644Z"
          fill="#0278E4"
        />
        <path
          d="M202.505 23.6183V32.8032H204.036H205.567V23.6183V14.4334H204.036H202.505V23.6183Z"
          fill="#0278E4"
        />
        <path
          d="M208.628 23.6183V32.8032H209.94C211.252 32.8032 211.252 32.8032 211.252 30.2664L211.296 27.7734L213.658 30.3102C215.889 32.7595 216.064 32.8469 217.9 32.7157L219.781 32.5845L216.632 29.2604L213.483 25.9801L216.501 22.9622C218.207 21.3002 219.563 19.7694 219.563 19.5944C219.563 19.3758 218.732 19.2445 217.726 19.2445C215.976 19.2445 215.67 19.4632 213.658 21.8688L211.471 24.4493L211.34 19.4195L211.209 14.4334H209.94H208.628V23.6183Z"
          fill="#0278E4"
        />
        <path
          d="M71.5107 16.0954C64.2065 19.5945 65.0376 30.7475 72.7354 32.8469C76.3219 33.8092 80.7394 32.4096 82.5763 29.7416C83.8447 27.8171 83.801 27.5547 82.0515 27.5547C80.9143 27.5547 80.1708 27.9483 79.0336 29.0855C77.6777 30.4414 77.2404 30.6163 75.3159 30.6163C71.7732 30.6163 69.5425 28.167 69.5425 24.2744C69.5425 18.4135 75.797 15.4831 79.3398 19.6819C80.1708 20.6879 80.7831 20.9941 81.964 20.9941C83.7573 20.9941 83.8447 20.8191 82.7076 18.9821C80.7831 15.7893 75.1847 14.3459 71.5107 16.0954Z"
          fill="#0278E4"
        />
        <path
          d="M171.889 16.839C171.889 17.8449 172.02 17.9324 174.076 17.9324H176.262V25.3678V32.8032H177.793H179.324V25.3678V17.9324H181.73C184.004 17.9324 184.135 17.8887 184.135 16.839V15.7455H178.012H171.889V16.839Z"
          fill="#0278E4"
        />
        <path
          d="M89.8806 19.2446C85.8567 20.4692 84.0197 25.9364 86.2941 29.9603C88.0436 33.0656 92.2424 34.2028 95.2603 32.3658C96.3975 31.666 96.6599 31.6223 96.6599 32.1472C96.6599 32.5845 97.141 32.8032 98.1907 32.8032H99.7215V26.0239V19.2446H98.1907C97.0973 19.2446 96.6599 19.4195 96.6599 19.9006C96.6599 20.513 96.5287 20.513 95.6977 19.9444C94.3418 19.1134 91.4988 18.7635 89.8806 19.2446ZM94.7354 22.2187C97.6221 24.5368 97.0973 29.0418 93.8169 30.4414C89.6181 32.1909 86.2941 26.0239 89.6181 22.6998C91.1052 21.2128 93.2921 20.9941 94.7354 22.2187Z"
          fill="#0278E4"
        />
        <path
          d="M107.069 19.4195C106.151 19.7257 105.407 19.8569 105.407 19.6382C105.407 19.4195 104.839 19.2445 104.095 19.2445H102.783V26.0239V32.8032H104.095H105.407V28.6481C105.407 23.9245 106.064 22.0437 107.813 21.6064C111.137 20.7754 112.405 22.831 112.405 28.8668V32.8032H113.718H115.03V28.6481C115.03 23.8807 115.686 22.0437 117.523 21.6064C119.097 21.2127 120.803 21.8688 121.459 23.1809C121.809 23.837 122.028 25.9801 122.028 28.5169V32.8032H123.34H124.652V27.7296C124.652 21.8251 124.171 20.5567 121.415 19.4632C119.36 18.6322 116.867 18.8946 115.292 20.163C114.199 21.0378 114.155 21.0378 112.93 20.1193C111.356 18.9384 109.081 18.676 107.069 19.4195Z"
          fill="#0278E4"
        />
        <path
          d="M133.881 19.1133C133.268 19.2445 132.35 19.6382 131.781 19.9881C130.863 20.6004 130.775 20.6004 130.775 19.9443C130.775 19.4195 130.382 19.2445 129.244 19.2445H127.714V29.3042V39.3638H129.244H130.775V35.4274V31.4911L132.219 32.3658C135.28 34.2465 139.479 33.0219 141.185 29.7416C143.547 25.0616 141.229 19.7694 136.461 19.1133C135.63 18.9821 134.449 18.9821 133.881 19.1133ZM137.817 22.6998C141.141 26.0239 137.817 32.1909 133.618 30.4414C131.081 29.3917 130.075 26.2426 131.431 23.6183C132.743 21.0378 135.718 20.6441 137.817 22.6998Z"
          fill="#0278E4"
        />
        <path
          d="M163.054 19.1133C161.26 19.3758 159.642 21.1253 159.642 22.831C159.642 25.1491 160.648 26.1113 164.06 27.1173C167.515 28.167 168.215 28.998 166.64 30.2664C165.415 31.2724 163.666 31.01 162.747 29.7416C162.354 29.173 161.654 28.8668 160.648 28.8668C159.292 28.8668 159.161 28.9543 159.467 29.829C160.167 32.2346 162.747 33.503 166.071 33.1094C168.696 32.8469 170.139 31.4473 170.139 29.2167C170.139 27.0736 169.133 26.0676 166.071 25.1929C163.054 24.3181 162.091 23.4434 162.704 22.2624C163.403 20.994 165.984 21.1253 166.902 22.5249C167.777 23.8807 170.139 24.0994 170.139 22.7873C170.139 20.9503 166.815 18.5885 164.672 18.8946C164.453 18.8946 163.71 19.0259 163.054 19.1133Z"
          fill="#0278E4"
        />
        <path
          d="M189.909 19.2445C187.066 19.9444 185.316 22.5249 185.316 26.0676C185.316 31.4036 190.39 34.8589 194.851 32.5408C195.682 32.1034 196.207 32.0597 196.294 32.3221C196.382 32.5845 197.125 32.8032 197.956 32.8032H199.443V26.0239V19.2445H197.913C196.819 19.2445 196.382 19.4195 196.382 19.9006C196.382 20.5129 196.251 20.5129 195.42 19.9444C194.107 19.1133 191.702 18.8072 189.909 19.2445ZM195.113 22.6998C197.431 25.0179 196.513 29.4791 193.451 30.6601C191.789 31.2724 189.471 30.0915 188.684 28.167C186.716 23.4434 191.658 19.2446 195.113 22.6998Z"
          fill="#0278E4"
        />
        <path
          d="M144.334 24.2744C144.334 27.8609 144.509 29.6978 144.99 30.5726C146.171 32.8907 150.195 33.9404 152.775 32.6283C153.431 32.2784 153.956 32.1471 153.956 32.4096C153.956 32.6283 154.656 32.8032 155.487 32.8032H157.018V26.0239V19.2446H155.487H153.956V23.7933C153.956 27.9921 153.869 28.4732 152.95 29.5666C151.638 31.0974 149.495 31.1849 148.139 29.7853C147.308 28.9543 147.177 28.2982 147.046 24.0557L146.871 19.2446H145.602H144.334V24.2744Z"
          fill="#0278E4"
        />
        <path
          d="M11.8091 32.3658V40.676H14.2146H16.6202V33.5467V26.4175L14.2146 25.2366L11.8091 24.0557V32.3658Z"
          fill="#0278E4"
        />
        <path
          d="M41.638 28.9106C36.2583 31.5348 31.6659 33.6779 31.4472 33.6779C31.2285 33.6779 29.2603 32.8032 27.1172 31.7098C24.974 30.6163 23.0933 29.7416 22.9621 29.7416C22.8309 29.7416 22.7434 32.2346 22.7434 35.2962V40.8946L25.2365 41.9443C26.6361 42.5567 28.5168 43.9125 29.6539 45.0497L31.6221 47.0616L33.6778 45.006C37.2205 41.507 38.6639 40.9821 45.6182 40.7634L51.6102 40.5885V32.3221C51.6102 27.7734 51.5665 24.0557 51.5227 24.0994C51.4353 24.0994 46.974 26.2863 41.638 28.9106Z"
          fill="#0278E4"
        />
        <path
          d="M181.405 42.1414C180.403 42.2085 176.124 42.4101 171.844 42.6452C163.012 43.0482 150.083 43.955 122.448 46.1045C96.2711 48.1533 85.6181 48.7243 77.6966 48.5899L70.9587 48.4892L69.8206 47.4144C68.5914 46.2725 67.4532 46.0374 66.5427 46.7091C64.9948 47.851 66.9525 50.3364 69.9572 50.9745C75.1016 52.0829 88.1675 51.6798 113.571 49.6647C162.693 45.7687 170.296 45.2985 186.412 45.0634C203.712 44.8283 210.587 45.3656 216.141 47.3808C217.734 47.9854 218.189 48.3884 218.872 49.7654C220.329 52.8218 223.334 52.721 222.97 49.5975C222.378 45.3321 215.777 43.0146 202.119 42.2757C196.792 41.9734 185.547 41.9063 181.405 42.1414Z"
          fill="#0278E4"
        />
      </svg>

      <p className="tracking-widest text-center text-xs md:text-sm 2xl:text-base text-[#342F2F] font-extralight md:mt-3 2xl:mt-6">
        YOUR COLLEGE LIFE MADE EASY
      </p>

      {/* form box */}
      <section className="bg-white rounded justify-center shadow-md w-[90%] md:w-2/3 lg:w-[40%] 2xl:w-1/3 my-14 md:my-20 2xl:my-28 mb-20 md:mb-14">
        <div
          className={
            active === "login"
              ? "absolute left-[36%] xsm:left-[38%] msm:left-[42%] msm:top-[19%] md:left-[42%] lg:left-[45%] lg:top-[20%] 2xl:left-[47.5%] top-[20%] 2xl:top-[25%]"
              : "absolute left-[36%] xsm:left-[38%] top-[17%] msm:left-[42%] md:left-[42%] md:top-[18%] lg:left-[45%] lg:top-[19%] 2xl:left-[47.5%] 2xl:top-[23%]"
          }
        >
          <img src={hat} className="w-auto h-16 md:h-24" alt="" />
        </div>

        <div className="text-center mt-10 md:mt-16">
          <button
            className={
              active === "signup"
                ? "p-2 md:p-3 mx-2 border-2 rounded-t-lg text-sm md:text-base 2xl:text-lg border-b-0 text-primary"
                : "p-2 md:p-3 mx-2 text-sm md:text-base 2xl:text-lg"
            }
            onClick={toggleActive}
          >
            Sign Up
          </button>

          <button
            className={
              active === "login"
                ? "p-2 md:p-3 mx-2 border-2 rounded-t-lg text-sm md:text-base 2xl:text-lg border-b-0 text-primary"
                : "p-2 md:p-3 mx-2 text-sm md:text-base 2xl:text-lg"
            }
            onClick={toggleActive}
          >
            Log In
          </button>
        </div>
        <hr />

        <div className="flex justify-center mt-6 md:mt-8">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <GoogleButton
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              />
            )}
            buttonText="Sign in with Google"
            onSuccess={handleLogin}
            onFailure={handleLogin}
            cookiePolicy={"single_host_origin"}
          />
        </div>

        <div className="or w-full mt-5 2xl:mt-6 px-4 md:px-6">
          <span className="text-center text-sm md:text-base 2xl:text-lg">
            OR
          </span>
        </div>

        <form className="px-6 md:px-10 py-3" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="my-3">
            <label htmlFor="email" className="text-sm md:text-base 2xl:text-lg">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="mt-2 block w-full px-3 py-1.5 md:py-2 border-2 border-gray-300 rounded-md text-sm 2xl:text-base shadow-sm placeholder-gray-400 
              focus:outline-none focus:border-sky-500"
              minLength={3}
              required
            />
            <p
              className="mt-3 text-sm text-red-600"
              hidden={active === "signup" && status === 409 ? false : true}
            >
              Email already exists
            </p>
          </div>

          {/* Password */}
          <div className="my-5 md:my-6">
            <label
              htmlFor="password"
              className="text-sm md:text-base 2xl:text-lg"
            >
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="mt-2 block w-full px-3 py-1.5 md:py-2 border-2 border-gray-300 rounded-md text-sm 2xl:text-lg shadow-sm placeholder-gray-400 
              focus:outline-none focus:border-sky-500"
              minLength={8}
              required
            />
            <p
              className="mt-3 text-sm text-red-600"
              hidden={active === "login" && status === 401 ? false : true}
            >
              Invalid Email or Password.
            </p>
          </div>

          {/* Confirm password */}
          <div
            className="my-5 md:my-6"
            hidden={active === "login" ? true : false}
          >
            <label
              htmlFor="confirmPassword"
              className="text-sm md:text-base 2xl:text-lg"
            >
              Confirm Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Retype your password"
              className="mt-2 block w-full px-3 py-1.5 md:py-2 border-2 border-gray-300 rounded-md text-sm 2xl:text-lg shadow-sm placeholder-gray-400 
              focus:outline-none focus:border-sky-500"
              minLength={8}
              required={active === "signup" ? true : false}
            />
            <p
              className="mt-3 text-sm text-red-600"
              hidden={status === 401 ? false : true}
            >
              Confirmed Password must be the same as password
            </p>
          </div>

          <Link
            to="/"
            className="text-xs text-primary"
            hidden={active === "login" ? false : true}
          >
            Forgot Password?
          </Link>

          {/* Submit */}
          <div className="my-6">
            <button className="px-2 md:px-3 py-2 mr-1 md:mr-2 text-sm md:text-base 2xl:text-lg bg-primary text-white rounded">
              {active === "signup" ? "Sign Up" : "Log in"}
            </button>
            <Link
              to="/"
              className="px-2 md:px-3 text-sm md:text-base 2xl:text-lg py-2 ml-1 md:ml-2 text-[#818181]"
            >
              Go Back
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}

export default withRouter(Auth);
