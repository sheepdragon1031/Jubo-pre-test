import { useEffect, useState } from "react"
import Head from "next/head"
import Appbar from "../components/appbar"
import Paper from "@mui/material/Paper"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Dialog from "@mui/material/Dialog"
// import ListItemButton from "@mui/material/ListItemButton"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import IconButton from "@mui/material/IconButton"
import CardActions from "@mui/material/CardActions"
import { CardActionArea } from "@mui/material"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import SendIcon from "@mui/icons-material/Send"
import { getList, getItem, postItem, DeleItem, putItem } from "../plugins/api"

import styles from "../styles/style.module.scss"
export default function Home() {
  const [getListPatient, setListPatient] = useState({ data: [] })
  const [inputMessage, setInputMessage] = useState("")
  const [inputMessageEdit, setInputMessageEdit] = useState("")
  const [isOpenDialog, setOpenDialog] = useState(false)
  const [isOpenCard, setOpenCard] = useState(false)
  const [isOpenEdit, setOpenEdit] = useState(false)
  const [colorList, setColorList] = useState([])
  const [getPatient, setPatient] = useState({
    data: {
      attributes: {
        orders: {
          data: []
        }
      }
    }
  })

  const fetchData = async () => {
    const res = await getList("patients")
    try {
      res.data.data.forEach((element) => {
        setColorList((prev) => [
          ...prev,
          `linear-gradient(170deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2)), linear-gradient(100deg, hsla(${
            Math.random() * 360
          }, 100%, 50%, 0.6), hsla(${Math.random() * 360}, 100%, 50%, 0.5));
        `
        ])
      })
    } catch (e) {
      console.log(e)
    }

    setListPatient(res.data)
    return res
  }
  const handlePostMessage = async () => {
    await postItem("orders", {
      message: inputMessage,
      patient: getPatient.data.id
    }).then((res) => {
      if (res.status === 200) {
        handleClickOpen({ id: getPatient.data.id })
        setOpenCard(false)
        setInputMessage("")
      }
    })
  }
  const handlePutMessage = async () => {
    await putItem("orders", isOpenEdit, {
      message: inputMessageEdit
    }).then((res) => {
      if (res.status === 200) {
        handleClickOpen({ id: getPatient.data.id })
        setOpenEdit(false)
        setInputMessage("")
      }
    })
  }
  const handleDeleteMessage = async (id) => {
    await DeleItem("orders", id).then((res) => {
      if (res.status === 200) {
        handleClickOpen({ id: getPatient.data.id })
      }
    })
  }
  const handleClickOpen = async ({ id }) => {
    const res = await getItem("patients", id)
    setPatient(res.data)
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <main>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Stack spacing={2}>
          <Appbar />
          <Paper sx={{ pb: 4 }} elevation={1}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <List
                  sx={{
                    m: "auto",
                    width: "100%",
                    bgcolor: "background.paper"
                  }}
                >
                  {getListPatient.data
                    ? getListPatient.data.map((item, index) => {
                        return (
                          <Container
                            maxWidth="sm"
                            sx={{ p: 0 }}
                            key={`Container--Card__${item.id}`}
                          >
                            <Card sx={{ m: "auto", my: 2 }} variant="outlined">
                              <CardActionArea
                                onClick={() => handleClickOpen({ id: item.id })}
                              >
                                <Box
                                  className={styles.card__Grid}
                                  sx={{
                                    backgroundImage: colorList[index]
                                  }}
                                >
                                  <Stack
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={2}
                                    sx={{
                                      height: "100%"
                                    }}
                                  >
                                    <Typography
                                      variant="h2"
                                      weight="bold"
                                      sx={{
                                        color: "#fff"
                                      }}
                                    >
                                      {item.attributes.name}
                                    </Typography>
                                  </Stack>
                                </Box>
                                <CardContent sx={{ px: 0 }}>
                                  <ListItem>
                                    <ListItemAvatar>
                                      <Avatar>
                                        <Avatar
                                          sx={{
                                            background: colorList[index]
                                          }}
                                        >
                                          {item.attributes.name.slice(0, 2)}
                                        </Avatar>
                                      </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>
                                      {item.attributes.name}
                                    </ListItemText>
                                  </ListItem>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </Container>
                        )
                      })
                    : null}
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Stack>
        <Dialog
          open={isOpenDialog}
          onClose={handleClose}
          fullWidth
          scroll="body"
        >
          <Container>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                flexDirection: "column",
                py: 2
              }}
            >
              <IconButton
                size="large"
                aria-label="LibraryAddIcon"
                onClick={() => {
                  setOpenCard(!isOpenCard)
                }}
              >
                <LibraryAddIcon />
              </IconButton>
            </Box>
            {isOpenCard ? (
              <Card>
                <CardHeader title="New Order Message" />
                <CardContent>
                  <TextField
                    fullWidth
                    id="Message"
                    label="Message"
                    variant="outlined"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    rows={4}
                    multiline
                  />
                </CardContent>
                <cardActions sx={{ m: 3 }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={2}
                  >
                    <Button variant="text" onClick={handlePostMessage}>
                      Send
                    </Button>
                  </Stack>
                </cardActions>
              </Card>
            ) : null}

            {getPatient.data.attributes.orders.data.length > 0 ? (
              getPatient.data.attributes.orders.data.map((item) => {
                return (
                  <Card key={`Dialog--Card__${item.id}`} sx={{ my: 3 }}>
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-label="recipe"
                          sx={{
                            backgroundImage: colorList[0]
                          }}
                        >
                          {getPatient.data.attributes.name.slice(0, 1)}
                        </Avatar>
                      }
                      title={getPatient.data.attributes.name}
                    />
                    {/* subheader={item.attributes.createdAt} */}
                    <CardContent>
                      {isOpenEdit === item.id ? (
                        <Container sx={{ p: 0 }}>
                          <TextField
                            sx={{ p: 0 }}
                            value={inputMessageEdit}
                            variant="outlined"
                            rows={4}
                            onChange={(e) =>
                              setInputMessageEdit(e.target.value)
                            }
                            multiline
                            fullWidth
                          />

                          <Stack
                            sx={{
                              py: 1
                            }}
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={2}
                          >
                            <IconButton
                              onClick={() => {
                                handlePutMessage()
                              }}
                            >
                              <SendIcon />
                            </IconButton>
                          </Stack>
                        </Container>
                      ) : (
                        <Container>
                          <Typography
                            variant="body1"
                            sx={{ whiteSpace: "pre-line" }}
                            color="text.secondary"
                          >
                            {item.attributes.message}
                          </Typography>
                        </Container>
                      )}
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <IconButton
                        aria-label="EditIcon"
                        onClick={() => {
                          setOpenEdit(isOpenEdit === item.id ? false : item.id)
                          setInputMessageEdit(item.attributes.message)
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="DeleteIcon">
                        <DeleteIcon
                          onClick={() => {
                            handleDeleteMessage(item.id)
                          }}
                        />
                      </IconButton>
                    </CardActions>
                  </Card>
                )
              })
            ) : (
              <Card elevation={0}>
                <CardContent>
                  <Typography variant="h5" color="text.secondary">
                    No Message
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Container>
        </Dialog>
      </Container>
    </main>
  )
}
