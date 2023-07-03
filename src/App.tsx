import React from "react";
import { useAuth } from "@clerk/clerk-react";
import {
  AppShell,
  Navbar,
  Header,
  Burger,
  useMantineTheme,
  Title,
  NavLink,
  Avatar,
  Menu,
  Box,
} from "@mantine/core";
import { Link, Outlet, useLocation } from "react-router-dom";

function App() {
  const theme = useMantineTheme();
  const auth = useAuth();
  console.log(auth);

  const [opened, setOpened] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error("Failed to hit test endpoint", err));
  }, []);

  return (
    <div style={{ height: "100dvh", width: "100dvw" }}>
      <AppShell
        padding="md"
        navbar={
          opened ? (
            <Navbar width={{ base: 300 }} p="xs">
              {[
                { to: "/", label: "Home" },
                { to: "/swings", label: "Swings" },
                { to: "/test", label: "test" },
              ].map((item) => (
                <NavItem key={item.label} to={item.to} label={item.label} />
              ))}
            </Navbar>
          ) : undefined
        }
        header={
          <Header
            height={60}
            p="xs"
            display="flex"
            sx={{ alignItems: "center" }}
          >
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
            <Box h="100%" sx={{ flexGrow: 1 }}>
              <Link
                style={{
                  all: "unset",
                  cursor: "pointer",
                  width: "min-content",
                }}
                to="/"
              >
                <Title>Swing Thoughts</Title>
              </Link>
            </Box>
            <Menu>
              <Menu.Target>
                <Avatar style={{ cursor: "pointer" }} radius="xl" />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => auth.signOut()}>Log Out</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <Outlet />
      </AppShell>
    </div>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  const location = useLocation();

  return (
    <NavLink
      component={Link}
      active={location.pathname === to}
      to={to}
      label={label}
      variant="subtle"
    />
  );
}

export default App;
