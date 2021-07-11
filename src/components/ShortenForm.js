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
import { getShortLink, isShortCodeAvailable } from "../service/requests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faClipboard,
  faSearch,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function ShortenForm(props) {
  const [longUrl, setlongUrl] = useState("");
  const [shortUrl, setshortUrl] = useState("");
  const [generationError, setgenerationError] = useState(false);
  const [copyTag, setcopyTag] = useState("Copy");
  const [checkAvailableIcon, setcheckAvailableIcon] = useState(faSearch);
  const [checkCodeAvaiblableTag, setcheckCodeAvaiblableTag] = useState(
    "Check Code Availability"
  );
  const [shortCode, setshortCode] = useState("");

  const generateShortLink = async () => {
    if (longUrl.length > 0) {
      setgenerationError(false);
      const shortLink = await getShortLink(longUrl, shortCode);
      if (shortLink) {
        setshortUrl(shortLink.short_url);
        return;
      }
    }
    setgenerationError(true);
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

          <br />
          <Form.Label>Shortened URL</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder={shortUrl ? shortUrl : "Short Link"}
              value={shortUrl}
              readOnly
            />

            {shortUrl && (
              <>
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
              </>
            )}

            <>
              <Form.Control
                type="text"
                placeholder="short code (at least 5 character long + no space)"
                onChange={(e) => {
                  setshortCode(e.target.value);
                }}
              />
              <InputGroup.Append>
                <InputGroup.Text>
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 250 }}
                    overlay={
                      <Tooltip id="editPostTooltip">
                        {checkCodeAvaiblableTag}
                      </Tooltip>
                    }
                  >
                    <FontAwesomeIcon
                      icon={checkAvailableIcon}
                      onClick={async () => {
                        if (await isShortCodeAvailable(shortCode)) {
                          setcheckAvailableIcon(faCheckCircle);
                          setcheckCodeAvaiblableTag("Code Available");
                        } else {
                          setcheckAvailableIcon(faTimesCircle);
                          setcheckCodeAvaiblableTag("Code Unavailable");
                        }
                        setTimeout(() => {
                          setcheckAvailableIcon(faSearch);
                          setcheckCodeAvaiblableTag("Check Code Availability");
                        }, 3000);
                      }}
                    />
                  </OverlayTrigger>
                </InputGroup.Text>
              </InputGroup.Append>
            </>
          </InputGroup>
          {shortUrl && (
            <Form.Text className="text-muted">
              Short Links are active for 48 hours only
            </Form.Text>
          )}
          {generationError && (
            <h6>There seems to be some error with your URL or custom code</h6>
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
