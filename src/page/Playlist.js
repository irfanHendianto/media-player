import {useState,useEffect,useContext} from "react";
import { Card, Divider, Typography,  Row, Col, Layout, Button ,Pagination  } from 'antd';
import { getTopTracks } from "../helper/index";
import { useHistory } from "react-router-dom";
import {SongContext} from "../context/SongContext"
const {Content } = Layout;
const { Meta } = Card;
const { Title } = Typography;

const Playlist = ()=>{
    const [track, setTrack] = useState([]);
    const [currentPageElements, setCurrentPageElements ] = useState([]);
    const [elementsPerPage,] = useState(4);
    const [pagesCount, setPagesCount] = useState(1)
    const [totalElementsCount, setTotalElementsCount] = useState(0)
    const [offset, setOffset] = useState(0)
    const { setcurrentSong,setLocation } = useContext(SongContext);

    let history = useHistory()

    useEffect(()=>{
        const fetchData = async () =>{
            const data = await getTopTracks();
            setTrack(data)
            setTotalElementsCount(data.length)
            setPaginationStates();
        }
        fetchData()
    },[offset,pagesCount])

    const setPaginationStates = () => {
        let pageCountTemp = Math.ceil(totalElementsCount / elementsPerPage)
        setPagesCount(pageCountTemp)
        setElementsForCurrentPage()
    }
    
    const setElementsForCurrentPage = () => {
        
        const currentPageElements = track.slice(offset, offset + elementsPerPage);
        setCurrentPageElements(currentPageElements)
    }
    
    const handlePageClick = (pageNumber) => {
        
        const currentPagee = pageNumber - 1;
        const offset = currentPagee * elementsPerPage;
        setOffset(offset)
        setElementsForCurrentPage()
        
    }
    const handlePlay = (id) =>{
        let data = track.filter(data=> data.trackId === id);
        let {name, artistName, thumbnailSrc, trackId, songSrc} = data[0]
        setcurrentSong({name, artistName, thumbnailSrc, trackId, songSrc})
        setLocation("playing")
        history.push(`/playing`)
    }
    return(
        <Layout>
                <Content style={{backgroundColor:'white',padding:'24px'}}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={24}>
                                <Title>Top 10 Track List </Title>
                        </Col>
                    </Row>
                    <Divider style={{border:'1px solid'}}></Divider>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{justifyContent:'center'}}>
                            <Row></Row>
                            {
                                currentPageElements.map((data,index)=>{
                                    return(
                                        <Col className="gutter-row" key={index}>
                                            <Card
                                                hoverable
                                                style={{ width: 240, marginTop:'20px' }}
                                                cover={<img alt="example" src={data.thumbnailSrc} />}
                                            >
                                                <Meta title={data.name} description={data.artistName} />
                                                <Button value={data.trackId} style={{marginTop:'10px'}} type="danger" onClick={()=>handlePlay(data.trackId)}>Play</Button>
                                            </Card>                                    
                                    </Col>
                                    );
                                })
                            }

                    </Row>
                {pagesCount > 1 &&
                    <Pagination
                        defaultCurrent={1}
                        onChange={handlePageClick}
                        size="medium"
                        total={totalElementsCount}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        pageSize={elementsPerPage}
                        showSizeChanger={false}
                        style={{margin:'10px',marginTop:'20px',marginLeft:'60px',marginBottom:'50px'}}
                    />
                }
                </Content>
        </Layout>
    );
}

export default Playlist;