const meinapp = {
    client: [
      {
        path: "/",
        element: isLoggedIn ? <Layout/> : <Navigate to="/" />,
        children: [
        { path: "/", element: <ClientDashboard/> },
        { path: "/client", element: <ClientDashboard/> },
        { path: "/post-job", element: <Postjob/> },
        {path:"/Search", element: <SearchPostPage/>},
        { path: "*", element: <div>no page found</div> },
        ],
      },
    ],

    default: [
      {
        path: "/",
        element: <LoginLayout />,
        children: [
          {path: "/", element: <Login /> },
          {path: "/login", element: <Login /> },
          {path: "/register", element: <Register /> },
          {path: "*", element: "No PAGE FOUNG" },
        ],
      },
    ],
  };