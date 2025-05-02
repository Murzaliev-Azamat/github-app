import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectEditUserLoading, selectFetchUserLoading, selectUser } from '../../../store/usersSlise';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { UserMutation } from '../../../types';
import { editUserProfile, getUserProfile } from '../../../store/usersThunks';
import EditButton from '../EditButton/EditButton';

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const fetchUserLoading = useAppSelector(selectFetchUserLoading);
  const editUserLoading = useAppSelector(selectEditUserLoading);

  const [editField, setEditField] = useState<'name' | 'location' | 'company' | 'bio' | null>(null);
  const [state, setState] = useState<UserMutation>({
    name: user?.name || '',
    company: user?.company || '',
    location: user?.location || '',
    bio: user?.bio || '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      editUserProfile({
        name: state.name,
        company: state.company,
        location: state.location,
        bio: state.bio,
      }),
    );
    setEditField(null);
    await dispatch(getUserProfile());
  };

  const onButtonCancel = () => {
    setState({
      name: user?.name || '',
      company: user?.company || '',
      location: user?.location || '',
      bio: user?.bio || '',
    });
    setEditField(null);
  };

  return fetchUserLoading ? (
    <LinearProgress />
  ) : (
    user && (
      <Card sx={{ maxWidth: 600, margin: '0 auto', mt: 4, p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} display="flex" justifyContent="center">
              <Avatar src={user.avatar_url} alt={user.name} sx={{ width: 100, height: 100 }} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box>
                {editField === 'name' ? (
                  <>
                    <Typography>{user.name}</Typography>
                    <TextField
                      name="name"
                      value={state.name}
                      onChange={inputChangeHandler}
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                    <EditButton submitFormHandler={submitFormHandler} editUserLoading={editUserLoading} />
                    <Button onClick={onButtonCancel} variant="outlined" size="small" sx={{ mt: 1, ml: 1 }}>
                      Отменить
                    </Button>
                  </>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>{user.name}</Typography>
                    <IconButton onClick={() => setEditField('name')}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Box>
                {editField === 'bio' ? (
                  <>
                    <Typography>{user.bio}</Typography>
                    <TextField
                      name="bio"
                      value={state.bio}
                      onChange={inputChangeHandler}
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                    <EditButton submitFormHandler={submitFormHandler} editUserLoading={editUserLoading} />
                    <Button onClick={onButtonCancel} variant="outlined" size="small" sx={{ mt: 1, ml: 1 }}>
                      Отменить
                    </Button>
                  </>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>{user.bio}</Typography>
                    <IconButton onClick={() => setEditField('bio')}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', height: '36px' }}>
                <Typography sx={{ mr: 1 }}>Login:</Typography>
                <Typography color="text.secondary">{user.login}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', height: '36px' }}>
                <Typography sx={{ mr: 1 }}>Email:</Typography>
                <Typography color="text.secondary">{user.email}</Typography>
              </Box>
              <Box>
                {editField === 'company' ? (
                  <>
                    <Typography sx={{ mr: 1 }}>Компания:</Typography>
                    <TextField
                      name="company"
                      value={state.company}
                      onChange={inputChangeHandler}
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                    <EditButton submitFormHandler={submitFormHandler} editUserLoading={editUserLoading} />
                    <Button onClick={onButtonCancel} variant="outlined" size="small" sx={{ mt: 1, ml: 1 }}>
                      Отменить
                    </Button>
                  </>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ mr: 1 }}>Компания:</Typography>
                    <Typography color="text.secondary">{user.company}</Typography>
                    <IconButton onClick={() => setEditField('company')}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Box>
                {editField === 'location' ? (
                  <>
                    <Typography sx={{ mr: 1 }}>Местоположение:</Typography>
                    <TextField
                      name="location"
                      value={state.location}
                      onChange={inputChangeHandler}
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                    <EditButton submitFormHandler={submitFormHandler} editUserLoading={editUserLoading} />
                    <Button onClick={onButtonCancel} variant="outlined" size="small" sx={{ mt: 1, ml: 1 }}>
                      Отменить
                    </Button>
                  </>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ mr: 1 }}>Местоположение:</Typography>
                    <Typography color="text.secondary">{user.location}</Typography>
                    <IconButton onClick={() => setEditField('location')}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Link href={user.html_url} target="_blank" sx={{ display: 'block' }}>
                {user.html_url}
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  );
};

export default Profile;
