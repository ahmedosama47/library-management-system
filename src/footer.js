import './footer.css';
function Footer(){
    return (
        <footer className="footer">
    <div className = "footer-left">
        <p>Contact: Ahmed Osama | +201000000000</p>
    </div>
    <div className = "footer-right">
        <p>© AAST Library . All rights reserved.</p>
    </div>
    <div className = "socials">
        <a href ="#"><i className='fab fa-facebook-f'></i></a>
        <a href ="#"><i className='fab fa-youtube'></i></a>
        <a href ="#"><i className='fab fa-instagram'></i></a>
    </div>
</footer>
    );

}
export default Footer;