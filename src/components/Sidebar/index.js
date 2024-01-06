import './style.scss'
import { Link } from 'react-router-dom';
export default function SideBar() {
  const data = [
    {
      section: 'Halaman Utama',
      list: [
        {
          name: "Dashboard",
          href: "/",
          icon: "bx bxs-package pe-2"
        },
      ]
    },
    {
      section: 'Kelola Produk',
      list: [
        {
          name: "Kategori",
          href: "/category",
          icon: "bx bx-category pe-2"
        },
        {
          name: "Produk",
          href: "/product",
          icon: "bx bx-box pe-2"
        },
        {
          name: "Batch & Stok",
          href: "/batchstock",
          icon: "bx bx-package pe-2"
        }
      ]
    },
    {
      section: 'Diskon',
      list: [
        {
          name: 'Daftar Diskon',
          href: '/discount',
          icon: 'bx bxs-discount pe-2'
        },
      ]
    },
    {
      section: 'Laporan',
      list: [
        {
          name: "Transaksi",
          href: "/transaction",
          icon: "bx bx-dollar-circle pe-2"
        },
        {
          name: "Laba & Rugi",
          href: "/category",
          icon: "bx bx-book pe-2"
        },
        {
          name: "Revenue",
          href: "/product",
          icon: "bx bx-dollar-circle pe-2"
        },
      ]
    },
    {
      section: 'Lainnya',
      list: [
        {
          name: "Pengaturan Database",
          href: "/db-setting",
          icon: "bx bx-data pe-2"
        },
        {
          name: "Cashier",
          href: "/cashier",
          icon: "bx bx-cart-download pe-2"
        },
      ]
    }
  ]
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse overflow-auto"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          {data.map((section, sectionIndex) => {
            return (
              <div key={sectionIndex}>
                <li className="nav-item">
                  <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>{section.section}</span>
                  </h6>
                </li>
                {section.list.map((list, listIndex) => {
                  return (
                    <li className="nav-item" key={listIndex}>
                      <Link to={list.href} className='nav-link'>
                        <span className={list.icon}></span>
                        {list.name}
                      </Link>
                    </li>
                  )
                })}
              </div>
            )
          })}
        </ul>
      </div>
    </nav>
  );
}
