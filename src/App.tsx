import React from 'react';
import {Route, BrowserRouter, Routes, useParams} from 'react-router-dom';
import './App.css';
import {Box, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const BlogH3Header = (props: any) => {
  return <Typography variant={"h3"} {...props} sx={{
    fontSize: '2rem',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 1,
  }} >- {props.children}</Typography>;
};

const BlogH2Header = (props: any) => {
  return <Typography  variant={"h2"} {...props} sx={{
    fontSize: '2.5rem',
    paddingTop: 3,
    paddingBottom: 3,
  }}>{props.children}</Typography>;
};

const BlogParagraph = (props: any) => {
  return <Typography {...props} sx={{paddingBottom: 2}}>{props.children}</Typography>;
};

// TODO Move to server? Wont be able to store content on server.?
const posts = [ // TODO Create a few blog posts. Maybe 3-5?
  {
    image: {
      url: '/pexels-tetyana-kovyrina-1692984.jpg',
    },
    url: 'rad-post',
    title: 'Some rad post',
    description: 'This is a really rad post. I think You will love it!',
    content: () => {
      return <>
        <BlogParagraph>
          Some rad into content.
        </BlogParagraph>
        <BlogH2Header>
          Some H2 Header
        </BlogH2Header>
        <BlogH3Header>
          Sub Header
        </BlogH3Header>
      </>;
    }
  },
  {
    image: {
      url: '/pexels-oleksandr-p-321562.jpg',
    },
    url: 'ok-post',
    title: 'An OK post... I guess',
    description: 'This is just an OK post. I hope you find it just OK, it is nothing special.',
    content: () => {
      return <>
        <BlogParagraph>
          Some OK into content.
        </BlogParagraph>
        <BlogH2Header>
          Some H2 Header
        </BlogH2Header>
        <BlogH3Header>
          Sub Header
        </BlogH3Header>

      </>;
    }
  },

];

function PostCard(props: any) {
  return <Box sx={{
    width: '400px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2
  }}>
    <Box sx={{
      width: '300px',
    }}>
      <img width={'100%'} src={props.image?.url} />
    </Box>
    <Typography variant={"h5"}>{props.title}</Typography>
    <Box sx={{padding: 1}}>
      {props.description}
    </Box>
    <Button variant={'contained'} component={Link} to={'/' + props.url}>Read more</Button>

  </Box>;
}

function FullPost(props: any) {
  return <Box sx={{
    margin: 2,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }}>
    <Box sx={{
      width: '90%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Box sx={{
        maxWidth: '800px'
      }}>
        <img width={'100%'} src={props.image?.url} />
      </Box>
    </Box>
    <Box sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Typography sx={{padding: 2}} variant={"h2"}>{props.title}</Typography>
    </Box>
    <Box sx={{
      padding: 2,
    }}>
      {props.content()}
    </Box>

    <Box sx={{
      width: '100%'
    }}>
      <Button component={Link} to={'/'}>Back to posts</Button>
    </Box>

    <Box sx={{
      width: '100%'
    }}>
      <Typography sx={{padding: 2}} variant={"h4"}>Other Posts</Typography>
    </Box>
    {posts.map((post) => {
      return <PostCard key={post.title} {...post} />;
    })}

  </Box>;
}


type Post = {
    image?: {
        url: string
    },
    url: string,
    title: string,
    description: string,
    content: () => JSX.Element

}

function App() {

  const [post, setPost] = React.useState<Post | null>(null);

  const params = useParams();

  React.useEffect(() => {

    if (params.id) {
      const postByURL = posts.find((post) => {
        return post.url === params.id;
      });

      if (postByURL) {
        document.title = postByURL.title;
        document.getElementsByName('description')[0].setAttribute('content', postByURL.description);
        setPost(postByURL);
      }

    } else {
      setPost(null);
    }

  }, [params.id]);


  return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 2,
      }}>

        {post && <FullPost {...post} />}

        {!post && posts.map((post) => {
          return <PostCard key={post.title} {...post} />;
        })}

      </Box>
  );
}

const Main = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:id" element={<App />} />
    </Routes>
  </BrowserRouter>
}

export default Main;
