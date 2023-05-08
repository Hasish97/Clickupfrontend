import React from 'react'
import { Col, Row } from 'react-bootstrap'
import NavBar from '../../../clickupcomponents/NavBar'
import Navigation from '../../../clickupcomponents/Navigation'
import TabBar from './tabBar/TabBar'
import DownloadPdf from './pdf/PdfDownload'

type Props = {}

export default function Reports({}: Props) {
    const title = 'Report';
    const author = 'Inova';
    const subject = 'Inova Report';
    const keywords = 'react, pdf, download';
  return (
    <>
        <NavBar />
        <Row className="mt-5 pt-5">
            <Col xs={2}>
                <Navigation></Navigation>
            </Col>
            <Col xs={10}>
                <TabBar/>
            </Col>
        </Row>
    </>
  )
}