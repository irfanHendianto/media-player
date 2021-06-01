import {useEffect,useContext} from "react";
import {SongContext} from "../context/SongContext"
import { getCurrentSongData } from "../helper/index";
import { Card, Divider, Typography,  Row, Col, Layout,  } from 'antd';
const {Content } = Layout;
const { Meta } = Card;
const { Title,Text } = Typography;

const Playing = () =>{
    const {currentSong, setcurrentSong} = useContext(SongContext);
    
    useEffect(()=>{
         const fetchData = async () =>{
            const {
                thumbnailSrc,
                name,
                artistName,
                songSrc,
            } = await getCurrentSongData(currentSong.trackId);

            setcurrentSong({
                ...currentSong,
                thumbnailSrc,
                name,
                artistName,
                songSrc,
              });
         }
          currentSong.trackId && fetchData();
    },[])
    return(
        <>     
        <Layout>
                <Content style={{backgroundColor:'white',padding:'24px'}}>
                    {(currentSong.trackId === '' )&& <Text>No music played. Please choose music first at playlist!</Text>}
                    {(currentSong.trackId !=='') &&
                    <>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={24}>
                                <Title>Playing {currentSong.name} </Title>
                        </Col>
                    </Row>
                    <Divider style={{border:'1px solid'}}></Divider>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Row></Row>
                            <Col className="gutter-row">
                                <Card
                                    hoverable
                                    style={{ width: 200 }}
                                    cover={<img alt="example" src={currentSong.thumbnailSrc} />}
                                >
                                    <Meta title={currentSong.name} description={currentSong.artistName} />
                                </Card> 
                               
                            </Col>
                            <Col span={8}>
                                <div style={{marginTop: '10px'}}>
                                    {/* Kita gunakan <audio /> untuk memainkan musik kita */}
                                    {/* Challenge: Bagaimana kalau kita ingin gunakan player custom? */}
                                    <audio src={currentSong.songSrc} controls style={{ width: "100%" }} />
                                </div>  
                            </Col>
                    </Row>
                    </>
                    }
                </Content>
        </Layout>
        </>
    );
}

export default Playing;