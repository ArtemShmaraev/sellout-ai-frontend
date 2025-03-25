import {parse} from "cookie";
import MainLayout from "@/layout/MainLayout";
import {Container} from "react-bootstrap";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['refresh_token']

    return { props: {} }
}

const Wishlist = () => {
    return (
        <MainLayout>
            <Container style={{marginTop: '150px'}}>
                <h3>hui</h3>
            </Container>
        </MainLayout>
    );
};

export default Wishlist;