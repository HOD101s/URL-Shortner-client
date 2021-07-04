import { useState } from "react";
import {
  Form,
  Button,
  Container,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import getShortLink from "../service/getShortLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faClipboard } from "@fortawesome/free-solid-svg-icons";

export default function ShortenForm(props) {
  const [longUrl, setlongUrl] = useState("");
  const [shortUrl, setshortUrl] = useState(null);
  const [generationError, setgenerationError] = useState(false);
  const [copyTag, setcopyTag] = useState("Copy");

  const generateShortLink = async () => {
    if (longUrl.length > 0) {
      setgenerationError(false);
      const shortLink = await getShortLink(longUrl);
      if (shortLink) {
        setshortUrl(shortLink.short_url);
      } else {
        setgenerationError(true);
      }
    } else {
      setgenerationError(true);
    }
  };

  return (
    <Container className="shortenForm">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Long URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Long URL to be Shortened"
            onChange={(e) => setlongUrl(e.target.value)}
          />
          <Form.Text className="text-muted">We love valid URLs</Form.Text>
          {shortUrl && (
            <>
              <br />
              <Form.Label>Shortened URL</Form.Label>
              <InputGroup>
                <Form.Control type="text" placeholder={shortUrl} readOnly />
                <InputGroup.Append>
                  <InputGroup.Text>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 250 }}
                      overlay={<Tooltip id="editPostTooltip">Visit</Tooltip>}
                    >
                      <FontAwesomeIcon
                        icon={faGlobe}
                        onClick={() => {
                          window.open(shortUrl);
                          window.focus();
                        }}
                      />
                    </OverlayTrigger>
                  </InputGroup.Text>
                </InputGroup.Append>
                <InputGroup.Append>
                  <InputGroup.Text>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 250 }}
                      overlay={
                        <Tooltip id="editPostTooltip">{copyTag}</Tooltip>
                      }
                    >
                      <CopyToClipboard text={shortUrl}>
                        <FontAwesomeIcon
                          icon={faClipboard}
                          onClick={() => {
                            setcopyTag("Copied!");
                            setTimeout(() => {
                              setcopyTag("Copy");
                            }, 5000);
                          }}
                        />
                      </CopyToClipboard>
                    </OverlayTrigger>
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
              <Form.Text className="text-muted">
                Short Links are active for 48 hours only
              </Form.Text>
            </>
          )}
          {generationError && (
            <>
              <h6>There seems to be some error with your URL</h6>
            </>
          )}
        </Form.Group>

        <Button
          variant="primary"
          onClick={async () => {
            await generateShortLink();
          }}
        >
          Generate Short Link
        </Button>
      </Form>
    </Container>
  );
}
