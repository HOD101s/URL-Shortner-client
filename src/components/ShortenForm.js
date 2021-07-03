import { useState } from "react";
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import getShortLink from "../service/getShortLink";

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
                  <InputGroup.Text
                    id="basic-addon2"
                    className="shortUrlFormControl"
                    onClick={() => {
                      window.open(shortUrl);
                      window.focus();
                    }}
                  >
                    Visit
                  </InputGroup.Text>
                </InputGroup.Append>
                <InputGroup.Append>
                  <InputGroup.Text
                    className="shortUrlFormControl"
                    id="basic-addon2"
                    onClick={() => {
                      navigator.clipboard.writeText(shortUrl);
                      setcopyTag("Copied");
                      setTimeout(() => {
                        setcopyTag("Copy");
                      }, 3000);
                    }}
                  >
                    {copyTag}
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
