import { Layout, Menu} from 'antd';
import {useContext, useEffect} from "react"
import Playlist from "./page/Playlist"
import Playing from "./page/Playing"
import {SongContext} from "./context/SongContext"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UnorderedListOutlined,PlaySquareOutlined   } from '@ant-design/icons';
const { Content, Sider } = Layout;

const Main = () =>{
    const {location, setLocation} = useContext(SongContext);
    useEffect(()=>{
        setLocation(location)
    },[location])
    return(
        <Router>
            {
                <Layout >
                    <Content style={{ padding: '0 50px'}}>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={200} theme="dark">
                                <Menu mode="inline" style={{height:'100%'}} selectedKeys={[location]} theme="dark" >
                                    <Menu.Item key="playlist" icon={<UnorderedListOutlined />} onClick={()=>setLocation("playlist")}>
                                        <Link to="/Playlist">
                                            Play List
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="playing" icon={<PlaySquareOutlined  />} onClick={()=>setLocation("playing")}>
                                        <Link to="/Playing">
                                            Playing
                                        </Link>
                                    </Menu.Item>

                                </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280,backgroundColor:'white'  }}>
                            <Switch>
                                <Route exact path="/Playlist" component={Playlist}/>
                                <Route exact path="/Playing" component={Playing}/>
                            </Switch>
                        </Content>
                    </Layout>
                    </Content>
                </Layout>

            }
        </Router>
    );
}

export default Main;