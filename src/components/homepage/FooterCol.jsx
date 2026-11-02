
const FooterCol = ({ title, links }) => (
  <div className="text-center mb-10 md:text-left md:mb-0">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    {links.map(({ label, href }) => (
      <p key={label} className="text-lg">
        <a href={href} target="_blank" rel="noreferrer" className="hover:opacity-60 transition ease-in-out">
          {label}
        </a>
      </p>
    ))}
  </div>
);

export default FooterCol;
