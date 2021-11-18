import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Navb from './Navb';
import { ListGroup, Card, Container } from 'react-bootstrap';

function Page() {
  console.log('in login')
  const [postsPerPage] = useState(5);
  const [offset, setOffset] = useState(0);
  const [posts, setAllPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0)

  const getPostData = (data) => {
    return (
      <Container className='my-3 d-flex justify-content-center'>
        {data.map(post => <div className="container" key={post.id}>

          <Card style={{ width: '18rem' }} className='my-3 d-flex justify-content-center'>
            <ListGroup variant="flush">
              <ListGroup.Item>User ID: {post.id}</ListGroup.Item>
              <ListGroup.Item>Title: {post.title}</ListGroup.Item>
            </ListGroup>
          </Card>
        </div>)}
      </Container>
    )


  }

  const getAllPosts = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
    console.log(res)
    const data = res.data;
    const current = offset * postsPerPage;
    const last = current + postsPerPage;
    const slice = data.slice(current, last)

    const postData = getPostData(slice)

    setAllPosts(postData)
    setPageCount(Math.ceil(data.length / postsPerPage))
  }

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setOffset(selectedPage)
    console.log(selectedPage)
  };

  useEffect(() => {
    getAllPosts()
  }, [offset])

  return (
    <div className="main-app">
      <Navb />

      {/* Display all the posts */}
      <br className='my-4' />
      {posts}

      {/* Using React Paginate */}
      <ReactPaginate
        previousLabel={"|<<"}
        nextLabel={">>|"}
        pageCount={pageCount}
        // pageRangeDisplayed={0}
        marginPagesDisplayed={3}
        breakLabel={'----'}
        breakClassName={"break-me"}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"} />
    </div>
  );
}

export default Page;