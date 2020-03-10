import React from 'react'
import { Button } from 'antd'
import styles from './style.module.scss'
import ScedarLogo from "assets/images/kukuza_icon_pack/scedar.png";

const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.inner}>
      <div className="row">
        <div className="col-lg-9">
          <p>

            <strong>Kukuza Empowerment SACCO - Youth Access to Finance!</strong>
          </p>
          <p>
            Kukuza is a Kiswahili word meaning nurturing. Our business is to nurture the youth
            on financial literacy. It’s better to learn finances when still young, because we
            understand the role of young people in shaping the world's economy is clear:
          </p>
          <p>
            We train groups, individuals on financial literacy, saving and entrepreneurship. Our
            work is to walk with them through their saving journey and achieve financial freedom
            and saving goals.

          </p>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="row">
          <div className="col-sm-6">
            {/*<a
              href="https://themeforest.net/item/clean-ui-react-admin-template/21938700"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4"
            >
              <Button type="danger">Buy Bundle 26$</Button>
            </a>*/}
          </div>
          <div className="col-sm-6">
            <div className={styles.copyright}>
              <img
                src={ScedarLogo}
                target="_blank"
                rel="noopener noreferrer"
                alt="Scedar Technologies"
              />
              <span>
                © {new Date().getFullYear()}{' '}
                <a href="https://scedar.co.ke/" target="_blank" rel="noopener noreferrer">
                    Scedar Technologies

                  </a>
                  <br/>
                  All rights reserved
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Footer
