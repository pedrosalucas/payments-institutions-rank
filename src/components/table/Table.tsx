import React from 'react'
import styles from '@/styles/Table.module.css'


export const Table = () => {
  return (
    <div className={styles.tableWrapper}>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Page</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Home</td>
                    <td>This is the main page</td>
                    <td>
                        <span>Live</span>
                    </td>
                    <td>
                        <span>
                            <div>clean</div>
                            <div>edit</div>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}
