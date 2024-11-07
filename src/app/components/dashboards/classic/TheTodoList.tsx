import React from "react";
import DashboardCard from "../../shared/DashboardCard";
import {
  Typography,
  Box,
  Avatar,
  Chip,
  Stack,
  FormControlLabel,
} from "@mui/material";
import CustomTextField from "../../forms/theme-elements/CustomTextField";
import CustomCheckbox from "../../forms/theme-elements/CustomCheckbox";

const TodoList = () => {
  const [value, setValue] = React.useState("");

  const [todos, setTodos] = React.useState([
    {
      isDone: false,
      title: "Schedule meeting with",
      sharewith: [
        {
          name: "Steave",
          imgSrc: "/images/profile/user-1.jpg",
        },
        {
          name: "Jessica",
          imgSrc: "/images/profile/user-2.jpg",
        },
      ],
    },
    {
      isDone: false,
      title: "Give purchase report to",
      sharewith: [
        {
          name: "John",
          imgSrc: "/images/profile/user-3.jpg",
        },
      ],
      time: "Today",
    },
    {
      isDone: false,
      title: "Book flight for holiday",
      date: "26 jun 2024",
    },
    {
      isDone: false,
      title: "Forward all tasks",
      date: "26 jun 2024",
      time: "2 weeks",
    },
    {
      isDone: false,
      title: "Send payment today",
      sharewith: [
        {
          name: "Steave",
          imgSrc: "/images/profile/user-1.jpg",
        },
        {
          name: "Jessica",
          imgSrc: "/images/profile/user-2.jpg",
        },
      ],
    },
  ]);

  // add todos

  const addTodo = (title: any) => {
    const newTodos = [
      ...todos,
      {
        isDone: false,
        title,
        shareWith: [],
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        time: new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ];
    setTodos(newTodos);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  const markTodo = (index: any) => {
    const newTodos = [...todos];
    newTodos[index].isDone = !newTodos[index].isDone;
    setTodos(newTodos);
  };

  const count = todos.filter(function (item) {
    if (item.isDone) {
      return true;
    } else {
      return false;
    }
  }).length;

  const remaincount = todos.filter(function (item) {
    if (item!.isDone) {
      return false;
    } else {
      return true;
    }
  }).length;

  const totalCount = todos.length;

  return (
    <DashboardCard
      title="To do List"
      subtitle="Task to complete"
      action={
        <Chip
          label={"Total Tasks : " + `${totalCount}`}
          sx={{
            backgroundColor: "secondary.light",
            color: "secondary.main",
          }}
        ></Chip>
      }
    >
      <>
        <form onSubmit={handleSubmit}>
          <CustomTextField
            id="default-value"
            variant="outlined"
            value={value}
            onChange={(e: any) => setValue(e.target.value)}
            placeholder="Add new tasks from here"
            fullWidth
          />
        </form>
        <Stack direction="row" spacing={3} mb={2} mt={3}>
          <Typography variant="h6">Remaining: {remaincount} </Typography>
          <Typography variant="h6">Completed: {count} </Typography>
        </Stack>

        {todos.map((todo, i) => (
          <Stack direction="row" alignItems="start" key={i} py={1}>
            <Box>
              <FormControlLabel
                control={
                  <CustomCheckbox
                    onChange={() => markTodo(i)}
                    color="success"
                  />
                }
                label={todo.title}
              />
              {todo.sharewith ? (
                <Stack direction="row" ml={3} mt={1} spacing={2}>
                  {todo.sharewith.map((share, i) => (
                    <Chip
                      key={i}
                      sx={{
                        backgroundColor: "primary.light",
                        color: "primary.main",
                      }}
                      avatar={<Avatar alt="Natacha" src={share.imgSrc} />}
                      label={share.name}
                      variant="filled"
                    />
                  ))}
                </Stack>
              ) : (
                ""
              )}
            </Box>
            <Box ml="auto" mt={1} display="flex" alignItems="center" gap={2}>
              {todo.date ? (
                <Typography variant="subtitle2" fontSize="12px">
                  {todo.date}
                </Typography>
              ) : (
                ""
              )}
              {todo.time ? (
                <Chip
                  sx={{
                    backgroundColor: "error.light",
                    color: "error.main",
                    ml: "auto",
                  }}
                  label={todo.time}
                  size="small"
                  variant="filled"
                />
              ) : (
                ""
              )}
            </Box>
          </Stack>
        ))}
      </>
    </DashboardCard>
  );
};

export default TodoList;
